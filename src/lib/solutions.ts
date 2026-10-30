export interface SolutionField {
  name: string;
  label: string;
  required?: boolean;
  type?: "select" | "text";
  options?: string[];
  placeholder?: string;
}

export interface SolutionConfig {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  interes: string;
  fields: SolutionField[];
}

export const SOLUTIONS: Record<string, SolutionConfig> = {
  consultoria: {
    slug: "consultoria",
    eyebrow: "Línea 01 · Consultoría",
    title: "Servicio de Consultoría",
    intro:
      "Análisis de mercado, valoración y estructuración patrimonial para decisiones inmobiliarias con mayor claridad.",
    interes: "Consultoría patrimonial",
    fields: [
      {
        name: "tipo_activo",
        label: "Tipo de activo a analizar",
        required: true,
        type: "select",
        options: [
          "Industrial / Bodegas",
          "Oficinas / Corporativo",
          "Comercial / Retail",
          "Hotelero / Turístico",
          "Lote / Desarrollo",
          "Portafolio mixto",
        ],
      },
      {
        name: "objetivo_consultoria",
        label: "Objetivo principal",
        required: true,
        type: "select",
        options: ["Comprar", "Vender"],
      },
    ],
  },
  usuarios: {
    slug: "usuarios",
    eyebrow: "Línea 02 · Representación de Usuarios",
    title: "Representación de Usuarios",
    intro:
      "Búsqueda y negociación de espacios bajo un diagnóstico que protege los intereses de su inversión hacia el futuro de su retorno.",
    interes: "Alquilar oficina/espacio",
    fields: [
      {
        name: "modalidad",
        label: "Modalidad de búsqueda",
        required: true,
        type: "select",
        options: ["Arriendo corporativo", "Compra de espacio", "Build-to-Suit (A la medida)"],
      },
      {
        name: "area_requerida",
        label: "Área aproximada (m²)",
        required: true,
        type: "text",
        placeholder: "Ej. 500 m² - 2.000 m²",
      },
    ],
  },
  propietarios: {
    slug: "propietarios",
    eyebrow: "Línea 03 · Representación de Propietarios",
    title: "Representación de Propietarios",
    intro:
      "Estrategia de comercialización y negociación para posicionar su inmueble ante compradores e inquilinos adecuados.",
    interes: "Vender propiedad",
    fields: [
      {
        name: "operacion",
        label: "Objetivo con el inmueble",
        required: true,
        type: "select",
        options: ["Venta del activo", "Colocación en arriendo", "Venta o arriendo"],
      },
      {
        name: "tipo_propiedad",
        label: "Tipo de inmueble",
        required: true,
        type: "select",
        options: [
          "Bodega / Parque industrial",
          "Edificio / Oficina corporativa",
          "Local / Activo comercial",
          "Lote para desarrollo",
          "Hotel / Activo especial",
        ],
      },
    ],
  },
  "off-market": {
    slug: "off-market",
    eyebrow: "Línea 04 · Inversión Off-Market",
    title: "Servicio de Inversión Off-Market",
    intro:
      "Originación, evaluación, adquisición y gestión de activos según su capital, retorno objetivo y horizonte de inversión.",
    interes: "Inversión off-market",
    fields: [
      {
        name: "ticket_inversion",
        label: "Rango de capital estimado (USD)",
        required: true,
        type: "select",
        options: [
          "USD $250k – $500k",
          "USD $500k – $1M",
          "USD $1M – $5M",
          "Más de USD $5M",
        ],
      },
      {
        name: "horizonte",
        label: "Enfoque de retorno",
        required: true,
        type: "select",
        options: [
          "Renta / Flujo de caja inmediato",
          "Valorización de capital",
          "Desarrollo / Cero interés industrial",
          "Diversificación patrimonial LATAM & USA",
        ],
      },
    ],
  },
};

export function getSolution(slug?: string): SolutionConfig | undefined {
  if (!slug) return undefined;
  return SOLUTIONS[slug];
}

