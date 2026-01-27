// Categories API endpoint

type Req = any;
type Res = any;

const categories = [
  {
    id: "mental-health",
    name: "Mental Health",
    nameNl: "Mentale Gezondheid",
    description: "Support for mental health issues, depression, anxiety, and emotional wellbeing",
    descriptionNl: "Ondersteuning bij mentale problemen, depressie, angst en emotioneel welzijn",
    icon: "brain",
    slug: "mental-health",
  },
  {
    id: "abuse-violence",
    name: "Abuse & Violence",
    nameNl: "Misbruik & Geweld",
    description: "Help for victims of abuse, violence, and assault",
    descriptionNl: "Hulp voor slachtoffers van misbruik, geweld en aanranding",
    icon: "shield",
    slug: "abuse-violence",
  },
  {
    id: "addiction",
    name: "Addiction",
    nameNl: "Verslaving",
    description: "Support for addiction to alcohol, drugs, gambling, and other substances",
    descriptionNl: "Ondersteuning bij verslaving aan alcohol, drugs, gokken en andere middelen",
    icon: "pill",
    slug: "addiction",
  },
  {
    id: "youth",
    name: "Youth & Children",
    nameNl: "Jeugd & Kinderen",
    description: "Support specifically for young people and children",
    descriptionNl: "Ondersteuning speciaal voor jongeren en kinderen",
    icon: "baby",
    slug: "youth",
  },
  {
    id: "lgbtq",
    name: "LGBTQ+",
    nameNl: "LGBTQ+",
    description: "Support for LGBTQ+ individuals and their families",
    descriptionNl: "Ondersteuning voor LGBTQ+ personen en hun families",
    icon: "heart",
    slug: "lgbtq",
  },
  {
    id: "domestic",
    name: "Domestic Issues",
    nameNl: "Huiselijke Problemen",
    description: "Help with domestic violence and family issues",
    descriptionNl: "Hulp bij huiselijk geweld en familiezaken",
    icon: "home",
    slug: "domestic",
  },
  {
    id: "financial",
    name: "Financial Help",
    nameNl: "Financiële Hulp",
    description: "Support for debt, poverty, and financial problems",
    descriptionNl: "Ondersteuning bij schulden, armoede en financiële problemen",
    icon: "wallet",
    slug: "financial",
  },
  {
    id: "legal",
    name: "Legal Aid",
    nameNl: "Juridische Hulp",
    description: "Free legal advice and support",
    descriptionNl: "Gratis juridisch advies en ondersteuning",
    icon: "scale",
    slug: "legal",
  },
];

export default function handler(req: Req, res: Res) {
  res.status(200).json(categories);
}
