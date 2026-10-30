const BRANDS = [
  "AMARILO",
  "CONSTRUCTORA BOLÍVAR",
  "CONCONCRETO",
  "GRUPO ARGOS",
  "MARVAL",
  "CUSEZAR",
  "PRODESA",
  "OSPINAS & CÍA",
  "TERRANUM",
  "PEI ASSET MANAGEMENT",
  "CEMEX",
  "HOLCIM",
  "HINES",
  "BROOKFIELD",
  "BLACKSTONE",
  "BERMUDEZ CONSTRUCTORA",
  "CONSTRUCTORA PGA",
];

function Row({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={ariaHidden}>
      {BRANDS.map((b) => (
        <span
          key={b}
          className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.28em] text-white/35 transition-colors duration-300 hover:text-gold"
        >
          {b}
        </span>
      ))}
    </div>
  );
}

export function BrandCarousel() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-navy py-10">
      <p className="mb-7 text-center text-[10px] uppercase tracking-[0.28em] text-white/40">
        Referentes del sector inmobiliario y de inversión
      </p>
      <div className="relative">
        <div className="marquee-track flex w-max">
          <Row />
          <Row ariaHidden />
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--color-navy)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[color:var(--color-navy)] to-transparent" />
      </div>
    </section>
  );
}

export default BrandCarousel;
