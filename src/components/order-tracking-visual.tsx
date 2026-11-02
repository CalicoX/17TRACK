import styles from "./order-tracking-visual.module.scss"

const PICKS = [
  { src: "/solutions/pick-vest.webp", name: "Quilted vest", price: "$89" },
  { src: "/solutions/pick-coffee.webp", name: "Coffee cup", price: "$18" },
  { src: "/solutions/pick-tote.webp", name: "Canvas tote", price: "$32" },
] as const

export function OrderTrackingVisual() {
  return (
    <div className={styles.frame}>
      <div className={styles.board}>
        <img
          src="/solutions/order-scene-bg.webp"
          alt=""
          draggable={false}
          className={styles.bg}
        />
        <article className={styles.card}>
          <h3 className={styles.title}>Your order has been delivered.</h3>
          <p className={styles.date}>
            <span className={styles.edd}>EDD</span> 7 Apr
          </p>
          <div className={styles.carrier}>
            <img src="/carriers/menu/usps.webp" alt="" className={styles.logo} />
            <div>
              <p className={styles.name}>USPS</p>
              <p className={styles.number}>936 ···· 7352</p>
            </div>
          </div>
          <p className={styles.status}>
            <span className={styles.mark}>
              <svg viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M2.5 6.2 4.7 8.4 9.5 3.6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Front door · Chandler, AZ
          </p>
          <p className={styles.event}>
            <span className={styles.dot} aria-hidden />
            6 Apr 21:10 · Out for delivery
          </p>
        </article>
        <article className={styles.picks}>
          <p className={styles.picksTitle}>You may also like</p>
          <ul className={styles.products}>
            {PICKS.map((item) => (
              <li key={item.name} className={styles.product}>
                <img src={item.src} alt="" className={styles.productImg} />
                <p className={styles.productName}>{item.name}</p>
                <p className={styles.productPrice}>{item.price}</p>
              </li>
            ))}
          </ul>
        </article>
        <img
          src="/solutions/order-scene-person.webp"
          alt="Shopper checking a delivered-order tracking page on her phone"
          draggable={false}
          className={styles.person}
        />
      </div>
    </div>
  )
}
