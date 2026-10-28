import * as THREE from "three"
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js"
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

const MODEL_URL = "/solutions/iphone-17-pro.glb"
const SCREEN_URL = "/solutions/app-screen.png"
const SCREEN_MATERIAL = "OLED"
/** Screen toward the camera, a little of the right edge showing. Static. */
const REST_YAW = 0.32
const REST_TILT_X = 0.06

type UvBounds = { min: [number, number]; span: [number, number] }

type LoadedAssets = {
  scene: THREE.Group
  image: HTMLImageElement | null
}

let assetsPromise: Promise<LoadedAssets> | null = null

function loadAssets() {
  if (!assetsPromise) {
    const draco = new DRACOLoader()
    draco.setDecoderPath("/draco/gltf/")
    const loader = new GLTFLoader()
    loader.setDRACOLoader(draco)
    const scene = loader.loadAsync(MODEL_URL).then((gltf) => gltf.scene)
    const image = new Promise<HTMLImageElement | null>((resolve) => {
      const texture = new THREE.TextureLoader().load(
        SCREEN_URL,
        (loaded) => {
          const next = loaded.image as HTMLImageElement
          loaded.dispose()
          resolve(next)
        },
        undefined,
        () => resolve(null),
      )
      texture.colorSpace = THREE.SRGBColorSpace
    })
    assetsPromise = Promise.all([scene, image])
      .then(([scene, image]) => ({ scene, image }))
      .catch((error) => {
        assetsPromise = null
        throw error
      })
  }
  return assetsPromise
}

function findScreenMesh(root: THREE.Object3D) {
  let found: THREE.Mesh | null = null
  root.traverse((obj) => {
    if (found) return
    const mesh = obj as THREE.Mesh
    if (!mesh.isMesh) return
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
    if (materials.some((material) => material?.name === SCREEN_MATERIAL)) found = mesh
  })
  return found
}

function geometryUvBounds(geometry: THREE.BufferGeometry): UvBounds {
  const uv = geometry.getAttribute("uv")
  if (!uv || uv.count === 0) return { min: [0, 0], span: [1, 1] }
  let uMin = Infinity
  let uMax = -Infinity
  let vMin = Infinity
  let vMax = -Infinity
  for (let i = 0; i < uv.count; i += 1) {
    const u = uv.getX(i)
    const v = uv.getY(i)
    if (u < uMin) uMin = u
    if (u > uMax) uMax = u
    if (v < vMin) vMin = v
    if (v > vMax) vMax = v
  }
  const uSpan = uMax - uMin
  const vSpan = vMax - vMin
  if (!(uSpan > 0) || !(vSpan > 0)) return { min: [0, 0], span: [1, 1] }
  return { min: [uMin, vMin], span: [uSpan, vSpan] }
}

function resolveScreenUv(mesh: THREE.Mesh, modelRoot: THREE.Object3D): UvBounds {
  let bounds = geometryUvBounds(mesh.geometry)
  const uv = mesh.geometry.getAttribute("uv")
  const position = mesh.geometry.getAttribute("position")
  if (uv && position && uv.count > 1) {
    let lo = 0
    let hi = 0
    for (let i = 1; i < uv.count; i += 1) {
      if (uv.getY(i) < uv.getY(lo)) lo = i
      if (uv.getY(i) > uv.getY(hi)) hi = i
    }
    mesh.updateWorldMatrix(true, false)
    modelRoot.updateWorldMatrix(true, false)
    const relative = new THREE.Matrix4()
      .copy(modelRoot.matrixWorld)
      .invert()
      .multiply(mesh.matrixWorld)
    const at = (index: number) =>
      new THREE.Vector3().fromBufferAttribute(position, index).applyMatrix4(relative)
    if (at(hi).y < at(lo).y) {
      bounds = {
        min: [bounds.min[0], bounds.min[1] + bounds.span[1]],
        span: [bounds.span[0], -bounds.span[1]],
      }
    }
  }

  const normal = mesh.geometry.getAttribute("normal")
  if (normal) {
    mesh.updateWorldMatrix(true, false)
    const accumulated = new THREE.Vector3()
    const one = new THREE.Vector3()
    const sampled = Math.min(normal.count, 32)
    for (let i = 0; i < sampled; i += 1) {
      accumulated.add(one.fromBufferAttribute(normal, i))
    }
    accumulated.normalize().transformDirection(mesh.matrixWorld)
    if (accumulated.z < 0) {
      bounds = {
        min: [bounds.min[0] + bounds.span[0], bounds.min[1]],
        span: [-bounds.span[0], bounds.span[1]],
      }
    }
  }
  return bounds
}

function createScreenMaterial(texture: THREE.Texture, uv: UvBounds) {
  return new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    toneMapped: false,
    uniforms: {
      map: { value: texture },
      uUvMin: { value: new THREE.Vector2(uv.min[0], uv.min[1]) },
      uUvSpan: { value: new THREE.Vector2(uv.span[0], uv.span[1]) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform vec2 uUvMin;
      uniform vec2 uUvSpan;
      varying vec2 vUv;
      void main() {
        vec2 base = (vUv - uUvMin) / uUvSpan;
        gl_FragColor = texture2D(map, clamp(base, 0.0, 1.0));
        #include <colorspace_fragment>
      }
    `,
  })
}

function makeShadowMaterial() {
  const canvas = document.createElement("canvas")
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext("2d")
  if (ctx) {
    const gradient = ctx.createRadialGradient(128, 128, 16, 128, 128, 128)
    gradient.addColorStop(0, "rgba(0,0,0,0.28)")
    gradient.addColorStop(0.55, "rgba(0,0,0,0.08)")
    gradient.addColorStop(1, "rgba(0,0,0,0)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 256, 256)
  }
  const map = new THREE.CanvasTexture(canvas)
  map.colorSpace = THREE.NoColorSpace
  return new THREE.MeshBasicMaterial({
    map,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  })
}

/**
 * The iPhone model from the portfolio device scene, with a static 17TRACK
 * app screen. It rests at one angle; it does not spin.
 * three.js and the glb load only when this is called.
 */
export function mountSolutionPhone(canvas: HTMLCanvasElement, onReady: () => void) {
    let disposed = false

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 1, 0.08, 40)
    camera.position.set(0, 0.04, 2.7)

    const pmrem = new THREE.PMREMGenerator(renderer)
    const room = new RoomEnvironment()
    const envMap = pmrem.fromScene(room, 0.04).texture
    room.dispose()
    scene.environment = envMap
    scene.environmentIntensity = 0.62

    scene.add(new THREE.DirectionalLight(0xfff4ea, 1.15).translateX(1.8).translateY(3.4).translateZ(2.4))
    const fill = new THREE.DirectionalLight(0xd5deea, 0.45)
    fill.position.set(-2.8, 1.2, 2.4)
    scene.add(fill)
    const rim = new THREE.DirectionalLight(0xf7f8fb, 0.7)
    rim.position.set(-1.4, 2.2, -3.2)
    scene.add(rim)

    const rig = new THREE.Group()
    rig.rotation.order = "YXZ"
    scene.add(rig)

    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), makeShadowMaterial())
    shadow.rotation.x = -Math.PI / 2
    shadow.visible = false
    scene.add(shadow)

    let model: THREE.Object3D | null = null
    let screenMaterial: THREE.Material | null = null
    let screenTexture: THREE.Texture | null = null
    const baseSize = new THREE.Vector3(0.72, 1.47, 0.1)

    rig.rotation.set(REST_TILT_X, REST_YAW, 0)

    const render = () => {
      if (disposed) return
      renderer.render(scene, camera)
    }

    const layout = () => {
      const width = Math.max(1, canvas.clientWidth)
      const height = Math.max(1, canvas.clientHeight)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      if (!model) return
      const distance = camera.position.z
      const visibleH = 2 * Math.tan((camera.fov * Math.PI) / 360) * distance
      const visibleW = visibleH * camera.aspect
      const scale = Math.min((visibleH * 0.67) / baseSize.y, (visibleW * 0.5) / baseSize.x)
      model.scale.setScalar(scale)
      const foot = (baseSize.y * scale) / 2
      shadow.position.y = -foot + 0.02
      shadow.scale.set(baseSize.x * scale * 1.35, baseSize.z * scale * 4.2, 1)
      shadow.visible = true
      render()
    }

    const resizeObserver = new ResizeObserver(() => layout())
    resizeObserver.observe(canvas)

    void loadAssets()
      .then(({ scene: source, image }) => {
        if (disposed) return
        const root = source.clone(true)
        root.traverse((obj) => {
          const mesh = obj as THREE.Mesh
          if (!mesh.isMesh) return
          mesh.castShadow = false
          mesh.receiveShadow = false
        })
        root.updateMatrixWorld(true)
        const box = new THREE.Box3().setFromObject(root)
        const size = box.getSize(baseSize)
        const center = box.getCenter(new THREE.Vector3())
        root.position.sub(center)
        // Screen faces -Z in the source file. Turn it toward the camera.
        root.rotation.y = Math.PI
        root.updateMatrixWorld(true)
        baseSize.copy(size)

        if (image) {
          screenTexture = new THREE.Texture(image)
          screenTexture.colorSpace = THREE.SRGBColorSpace
          screenTexture.anisotropy = renderer.capabilities.getMaxAnisotropy()
          screenTexture.minFilter = THREE.LinearMipmapLinearFilter
          screenTexture.magFilter = THREE.LinearFilter
          screenTexture.needsUpdate = true
          const screen = findScreenMesh(root)
          if (screen) {
            const uv = resolveScreenUv(screen, root)
            screenMaterial = createScreenMaterial(screenTexture, uv)
            screen.material = screenMaterial
          }
        }

        model = root
        rig.add(root)
        canvas.dataset.ready = "1"
        layout()
        onReady()
      })
      .catch((error) => {
        console.error("solution phone failed to load", error)
      })

    return () => {
      disposed = true
      resizeObserver.disconnect()
      screenMaterial?.dispose()
      screenTexture?.dispose()
      shadow.geometry.dispose()
      ;(shadow.material as THREE.Material).dispose()
      envMap.dispose()
      pmrem.dispose()
      renderer.dispose()
    }
}
