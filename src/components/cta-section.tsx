export function CtaSection() {
  return (
    <section className="w-full bg-black text-white antialiased">
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-16 md:py-24">
        <img
          src="/cta/streamline.webp"
          alt=""
          width={730}
          height={877}
          className="mx-auto block h-auto w-[min(420px,80%)]"
          draggable={false}
        />
        <div className="max-w-[560px]">
          <h2 className="m-0 text-[clamp(32px,4vw,56px)] leading-[1.1] font-bold tracking-[-0.03em]">
            Upgrade your tracking and returns experience.
          </h2>
          <p className="mt-6 text-[18px] leading-7 text-white/70">
            Reimagine post-purchase journeys with 17TRACK SaaS.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://www.17track.com/en/products"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-lg bg-[#ff8a00] px-5 text-[16px] font-medium text-white no-underline hover:bg-[#e67c00]"
            >
              Start Free Trial
            </a>
            <a
              href="https://www.17track.com/en/contact-us"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-lg border border-[#ff8a00] px-5 text-[16px] font-medium text-[#ff8a00] no-underline hover:bg-[#ff8a00]/10"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
