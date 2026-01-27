// Featured Helplines API endpoint

type Req = any;
type Res = any;

const helplines = [
  {
    id: "113-suicide",
    name: "113 Zelfmoordpreventie",
    description: "Suicide prevention hotline available 24/7",
    descriptionNl: "Zelfmoordpreventielijn, 24 uur per dag, 7 dagen per week bereikbaar",
    phone: "113",
    website: "https://www.113.nl",
    categoryId: "mental-health",
    hoursNl: "24/7 bereikbaar",
    languages: ["Nederlands", "Engels"],
    isEmergency: true,
    isFeatured: true,
  },
  {
    id: "0800-0113",
    name: "113 Gratis Nummer",
    description: "Free suicide prevention hotline",
    descriptionNl: "Gratis zelfmoordpreventielijn",
    phone: "0800-0113",
    website: "https://www.113.nl",
    categoryId: "mental-health",
    hoursNl: "24/7 bereikbaar",
    languages: ["Nederlands"],
    isEmergency: true,
    isFeatured: true,
  },
  {
    id: "sensoor",
    name: "Sensoor",
    description: "Anonymous listening service for loneliness and difficult moments",
    descriptionNl: "Anonieme luisterlijn voor eenzaamheid en moeilijke momenten",
    phone: "088-0767000",
    website: "https://www.sensoor.nl",
    categoryId: "mental-health",
    hoursNl: "24/7 bereikbaar",
    languages: ["Nederlands"],
    isFeatured: true,
  },
  {
    id: "korrelatie",
    name: "Korrelatie",
    description: "Support for psychological and social problems",
    descriptionNl: "Ondersteuning bij psychische en sociale problemen",
    phone: "0900-1450",
    website: "https://www.korrelatie.nl",
    categoryId: "mental-health",
    hoursNl: "Ma-Vr 9:00-18:00",
    languages: ["Nederlands"],
    isFeatured: true,
  },
  {
    id: "veilig-thuis",
    name: "Veilig Thuis",
    description: "Advice and support for domestic violence and child abuse",
    descriptionNl: "Advies en ondersteuning bij huiselijk geweld en kindermishandeling",
    phone: "0800-2000",
    website: "https://www.veiligthuis.nl",
    categoryId: "abuse-violence",
    hoursNl: "24/7 bereikbaar",
    languages: ["Nederlands"],
    isEmergency: true,
    isFeatured: true,
  },
  {
    id: "kindertelefoon",
    name: "De Kindertelefoon",
    description: "Free and anonymous helpline for children up to 18 years",
    descriptionNl: "Gratis en anonieme hulplijn voor kinderen tot 18 jaar",
    phone: "0800-0432",
    website: "https://www.kindertelefoon.nl",
    categoryId: "youth",
    hoursNl: "Dagelijks 11:00-21:00",
    languages: ["Nederlands"],
    isFeatured: true,
  },
];

export default function handler(req: Req, res: Res) {
  const featured = helplines.filter((h) => h.isFeatured);
  res.status(200).json(featured);
}
