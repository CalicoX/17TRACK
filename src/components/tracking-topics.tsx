type TopicCard = {
  title: string
  description: string
  image: string
  imageAlt: string
  href?: string
}

type TopicAction = {
  label: string
  href: string
}

const SITE = "https://www.17track.net"

const CARRIER_CARDS: TopicCard[] = [
  {
    title: "DHL Track Package",
    description:
      "DHL is a global logistics and express delivery company under Deutsche Post DHL Group, offering international shipping, freight, eCommerce, and supply chain services. With operations in over 220 countries and territories, it is one of the world's largest and most established logistics providers.",
    image: "/tracking/carriers/dhl.png",
    imageAlt: "DHL",
    href: `${SITE}/en/carriers/dhl`,
  },
  {
    title: "UPS tracking Track Package",
    description:
      "UPS (United Parcel Service) is a global logistics leader providing parcel delivery, freight, and supply chain services. It delivers millions of packages daily through an extensive network of air, ground, and sea transportation.",
    image: "/tracking/carriers/ups.png",
    imageAlt: "UPS tracking",
    href: `${SITE}/en/carriers/ups`,
  },
  {
    title: "Speedx tracking Track Package",
    description:
      "SpeedX is a technology-driven last-mile delivery company focused on fast and reliable eCommerce shipping, primarily across the U.S. It operates an integrated network of sorting hubs, delivery partners, and proprietary software to manage parcel pickup, routing, and final delivery.",
    image: "/tracking/carriers/speedx.png",
    imageAlt: "Speedx tracking",
    href: `${SITE}/en/carriers/speedx`,
  },
  {
    title: "YunExpress tracking Track Package",
    description:
      "YunExpress is a China-based global logistics and cross-border e-commerce shipping provider. It uses an extensive network of hubs, customs support, air freight (including its own Boeing 777 freighters) and partner carriers to serve 220+ countries and regions, handling over 1 million packages daily with 30+ transfer centers and 1,500+ logistics professionals.",
    image: "/tracking/carriers/yunexpress.png",
    imageAlt: "YunExpress tracking",
    href: `${SITE}/en/carriers/yunexpress`,
  },
  {
    title: "DPD tracking Track Package",
    description:
      "DPD is a global parcel delivery provider within the Geopost (La Poste) group. It uses a centralized hub-and-depot network with local couriers and digital tracking to manage door-to-door deliveries. Operating in over 50 countries, DPD is one of Europe's largest parcel networks, handling millions of shipments each day.",
    image: "/tracking/carriers/dpd.png",
    imageAlt: "DPD tracking",
    href: `${SITE}/en/carriers/dpd-de`,
  },
  {
    title: "XPO tracking Track Package",
    description:
      "XPO is a U.S.\u2011based transportation and logistics company providing freight, less\u2011than\u2011truckload (LTL), and supply chain solutions for businesses across North America and Europe. Serving tens of thousands of customers, XPO is one of the major players in global freight and logistics.",
    image: "/tracking/carriers/xpo.png",
    imageAlt: "XPO tracking",
    href: `${SITE}/en/carriers/xpo`,
  },
  {
    title: "OnTrac tracking Track Package",
    description:
      "OnTrac is a U.S. last\u2011mile parcel delivery company specializing in faster, cost\u2011effective e\u2011commerce shipping, serving about 70\u201375% of the U.S. population with regional and transcontinental network coverage.",
    image: "/tracking/carriers/ontrac.png",
    imageAlt: "OnTrac tracking",
    href: `${SITE}/en/carriers/ontrac`,
  },
  {
    title: "Old Dominion tracking Track Package",
    description:
      "Old Dominion Freight Line (ODFL) is a top U.S. less-than-truckload (LTL) carrier, moving smaller shipments efficiently across North America. Its network of terminals, trucks, and logistics systems enables fast and reliable freight delivery.",
    image: "/tracking/carriers/old-dominion.png",
    imageAlt: "Old Dominion tracking",
  },
  {
    title: "UniUni tracking Track Package",
    description:
      "UniUni is a North American last-mile delivery company specializing in e-commerce shipping. It leverages hubs, local drivers, and AI-powered routing to transfer parcels efficiently from pickup to doorstep, serving retailers across the U.S. and Canada.",
    image: "/tracking/carriers/uniuni.png",
    imageAlt: "UniUni tracking",
    href: `${SITE}/en/carriers/uniuni`,
  },
  {
    title: "Saia tracking Track Package",
    description:
      "Headquartered in Georgia, Saia is a major U.S. less\u2011than\u2011truckload (LTL) freight and logistics company. It operates 200+ terminals and thousands of trucks to efficiently pick up, sort, and deliver freight across North America.",
    image: "/tracking/carriers/saia.png",
    imageAlt: "Saia tracking",
    href: `${SITE}/en/carriers/saia`,
  },
  {
    title: "Royal Mail Track Package",
    description:
      "Royal Mail is the UK's historic national postal and parcel delivery service, handling billions of shipments annually, including around 6.3 billion letters and over 1 billion parcels, to 32 million addresses nationwide through its network of 12,000 delivery offices and 115,000 postboxes.",
    image: "/tracking/carriers/royal-mail.png",
    imageAlt: "Royal Mail",
    href: `${SITE}/en/carriers/royal-mail`,
  },
  {
    title: "GOFO Express tracking Track Package",
    description:
      "GoFo is a U.S. last-mile delivery service specializing in fast, reliable e-commerce shipping. It uses sorting centers, local couriers, and real-time tracking to deliver parcels efficiently across thousands of ZIP codes.",
    image: "/tracking/carriers/gofo.png",
    imageAlt: "GOFO Express tracking",
    href: `${SITE}/en/carriers/gofo`,
  },
]

const ORDER_CARDS: TopicCard[] = [
  {
    title: "eBay tracking Track Package",
    description:
      "eBay allows buyers and sellers to trade a wide variety of items, from collectibles to electronics, through auctions or fixed-price listings. Once an item is shipped, sellers provide tracking details so buyers can follow the parcel delivery progress.",
    image: "/tracking/brands/ebay.png",
    imageAlt: "eBay tracking",
    href: `${SITE}/en/brands/ebay`,
  },
  {
    title: "AliExpress tracking Track Package",
    description:
      "AliExpress is a global online retail marketplace based in China where consumers can buy a wide range of products directly from manufacturers and sellers worldwide. It usually ships goods, often from China or regional warehouses in the U.S., Europe, or other locations.",
    image: "/tracking/brands/aliexpress.png",
    imageAlt: "AliExpress tracking",
    href: `${SITE}/en/brands/aliexpress`,
  },
  {
    title: "Amazon tracking Track Package",
    description:
      "Amazon is a global e-commerce platform offering millions of products sold by Amazon and third-party sellers. Orders are fulfilled through Amazon's logistics network or partner carriers. Customers can track shipments in real time via their Amazon account or track.amazon.com.",
    image: "/tracking/brands/amazon.png",
    imageAlt: "Amazon tracking",
    href: `${SITE}/en/brands/amazon`,
  },
  {
    title: "Shein tracking Track Package",
    description:
      "Shein is a global fast-fashion eCommerce brand serving customers in 150+ countries. It ships affordable apparel and lifestyle products mainly from China and overseas warehouses directly to shoppers worldwide.",
    image: "/tracking/brands/shein.png",
    imageAlt: "Shein tracking",
    href: `${SITE}/en/brands/shein`,
  },
  {
    title: "Wish tracking Track Package",
    description:
      "Wish connects millions of value\u2011seeking shoppers with hundreds of thousands of merchants. It offers affordable products in fashion, electronics, and home goods, etc.",
    image: "/tracking/brands/wish.png",
    imageAlt: "Wish tracking",
    href: `${SITE}/en/brands/wish`,
  },
  {
    title: "DHgate tracking Track Package",
    description:
      "DHgate connects buyers with manufacturers and wholesalers, mainly from China, offering products at competitive factory-direct prices. DHgate supports international shipping, order tracking, and dispute protection.",
    image: "/tracking/brands/dhgate.png",
    imageAlt: "DHgate tracking",
    href: `${SITE}/en/brands/dhgate`,
  },
  {
    title: "Etsy tracking Track Package",
    description:
      "Etsy is an online marketplace for handmade, vintage, and unique products created by independent sellers. Once an order is shipped, customers can track shipments and communicate with sellers directly through Etsy's platform.",
    image: "/tracking/brands/etsy.png",
    imageAlt: "Etsy tracking",
    href: `${SITE}/en/brands/etsy`,
  },
  {
    title: "Lazada tracking Track Package",
    description:
      "Lazada serves shoppers in countries like Indonesia, Malaysia, the Philippines, Singapore, Thailand, and Vietnam. Once orders are shipped, customers can track their delivery status through Lazada's tracking system.",
    image: "/tracking/brands/lazada.png",
    imageAlt: "Lazada tracking",
    href: `${SITE}/en/brands/lazada`,
  },
  {
    title: "Shopee tracking Track Package",
    description:
      "Shopee is an online platform that sells electronics, fashion, beauty, home goods, groceries, and more. Sellers handle order fulfillment, and once shipped, customers can track deliveries directly through Shopee's app or website.",
    image: "/tracking/brands/shopee.png",
    imageAlt: "Shopee tracking",
    href: `${SITE}/en/brands/shopee`,
  },
  {
    title: "Wayfair tracking Track Package",
    description:
      "Wayfair offers a wide range of home furniture, d\u00e9cor, lighting, rugs, storage solutions, kitchenware, outdoor furniture, and home improvement products. Stay updated with your order status on its platform or via 17TRACK.",
    image: "/tracking/brands/wayfair.png",
    imageAlt: "Wayfair tracking",
    href: `${SITE}/en/brands/wayfair`,
  },
  {
    title: "Walmart tracking Track Package",
    description:
      "Walmart is a global retail giant offering a wide range of products online, including groceries, electronics, clothing, home goods, and more. It provides real\u2011time shipment updates so you can see where your order is every step of the way.",
    image: "/tracking/brands/walmart.png",
    imageAlt: "Walmart tracking",
    href: `${SITE}/en/brands/walmart`,
  },
  {
    title: "Costco tracking Track Package",
    description:
      "Costco is a membership\u2011based warehouse retailer where members can shop for bulk groceries, electronics, appliances, furniture, and household essentials both in\u2011store and online. You can monitor your Costco shipment status at 17TRACK easily.",
    image: "/tracking/brands/costco.png",
    imageAlt: "Costco tracking",
    href: `${SITE}/en/brands/shopee`,
  },
]

const CARGO_CARDS: TopicCard[] = [
  {
    title: "Air China Cargo tracking Track Package",
    description:
      "Air China Cargo handles international freight operations under Air China, moving shipments worldwide through a combination of scheduled cargo flights and passenger aircraft. It supports the transport of standard goods, temperature-sensitive items, and special cargo.",
    image: "/tracking/cargos/air-china-cargo.jpg",
    imageAlt: "Air China Cargo tracking",
  },
  {
    title: "Atlas Air Cargo tracking Track Package",
    description:
      "Atlas Air Cargo is the air freight division of Atlas Air, a global cargo airline operating a large fleet of freighter aircraft for international shipping and charter services.",
    image: "/tracking/cargos/atlas-air-cargo.jpg",
    imageAlt: "Atlas Air Cargo tracking",
  },
  {
    title: "Singapore Airlines Cargo tracking Track Package",
    description:
      "Singapore Airlines Cargo manages air freight services across an extensive international route network. Shipments are transported using dedicated freighters and cargo space on passenger flights.",
    image: "/tracking/cargos/singapore-airlines-cargo.jpg",
    imageAlt: "Singapore Airlines Cargo tracking",
  },
]

function TopicCardView({ card }: { card: TopicCard }) {
  const className =
    "flex h-full flex-col gap-3 rounded-2xl border border-[#e6e8ee] bg-white p-5 text-[#212121] no-underline"
  const body = (
    <>
      <div className="flex items-center gap-3">
        <span className="inline-flex size-11 shrink-0 overflow-hidden rounded-[8px] border border-[#e6e8ee] bg-white">
          <img
            src={card.image}
            alt={card.imageAlt}
            width={44}
            height={44}
            className="size-full object-contain"
          />
        </span>
        <h3 className="text-[16px] leading-6 font-semibold">{card.title}</h3>
      </div>
      <p className="m-0 text-[13px] leading-5 text-[#5c6370]">{card.description}</p>
    </>
  )

  if (!card.href) {
    return <div className={className}>{body}</div>
  }

  return (
    <a href={card.href} className={`${className} transition-colors hover:bg-[#fafafa]`}>
      {body}
    </a>
  )
}

function TopicModule({
  id,
  heading,
  lead,
  cards,
  action,
}: {
  id: string
  heading: string
  lead: string
  cards: TopicCard[]
  action?: TopicAction
}) {
  return (
    <section id={id} className="w-full bg-[#f6f6f6] py-10 text-[#212121] antialiased md:py-14">
      <div className="mx-auto w-full max-w-[1440px] px-6">
        <h2 className="track-solutions-title mb-[5px] text-center font-bold text-[#212121]">
          {heading}
        </h2>
        <p className="mx-auto max-w-[728px] text-center text-[16px] leading-6 text-[#212121]">
          {lead}
        </p>
        <ul className="mt-12 flex w-full list-none snap-x snap-mandatory gap-[16px] overflow-x-auto px-0 py-px md:grid md:snap-none md:grid-cols-2 md:gap-[30px] md:overflow-visible md:py-0 xl:grid-cols-3">
          {cards.map((card) => (
            <li key={card.title} className="w-[280px] shrink-0 snap-start md:w-auto md:snap-align-none">
              <TopicCardView card={card} />
            </li>
          ))}
        </ul>
        {action ? (
          <a
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-[30px] block max-w-[360px] text-center text-[14px] leading-[34px] text-[#003a9b]"
          >
            {action.label}
          </a>
        ) : null}
      </div>
    </section>
  )
}

export function CarrierTrackingSection() {
  return (
    <TopicModule
      id="carrier-tracking"
      heading="Carrier tracking"
      lead="17TRACK supports international parcel tracking with 3500+ global carriers, covering China Post, YunExpress, 4PX, La Poste, and other major logistics providers worldwide, across Asia, Europe, and the Americas."
      cards={CARRIER_CARDS}
      action={{
        label: "View All Supported Carriers >>",
        href: `${SITE}/en/carriers`,
      }}
    />
  )
}

export function OrderTrackingSection() {
  return (
    <TopicModule
      id="order-tracking"
      heading="Order tracking"
      lead='No more "Where is my parcel?" inquries. Track your orders from eCommerce brands directly on 17TRACK and get real-time delivery updates.'
      cards={ORDER_CARDS}
    />
  )
}

export function CargoTrackingSection() {
  return (
    <TopicModule
      id="cargo-tracking"
      heading="Cargo tracking"
      lead="Track your cargo effortlessly using your air waybill (AWB) number. Simply enter it on the airline's website or on 17TRACK to view real-time shipment status and the latest delivery updates."
      cards={CARGO_CARDS}
    />
  )
}
