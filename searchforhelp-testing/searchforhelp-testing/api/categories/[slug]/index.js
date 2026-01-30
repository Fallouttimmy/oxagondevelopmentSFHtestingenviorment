// Category Detail API endpoint
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
    descriptionNl: "Hulp voor slachtoffers van misbruik, geweld en agressie",
    icon: "shield",
    slug: "abuse-violence",
  },
  {
    id: "child-family",
    name: "Child & Family",
    nameNl: "Kind & Familie",
    description: "Support for children, parents, and family issues",
    descriptionNl: "Ondersteuning voor kinderen, ouders en familieproblemen",
    icon: "baby",
    slug: "child-family",
  },
  {
    id: "addiction",
    name: "Addiction",
    nameNl: "Verslaving",
    description: "Help with substance abuse, alcohol, and gambling addiction",
    descriptionNl: "Hulp bij drugsgebruik, alcohol en gokverslaving",
    icon: "pill",
    slug: "addiction",
  },
  {
    id: "lgbtq",
    name: "LGBTQ+",
    nameNl: "LGBTQ+",
    description: "Support for LGBTQ+ individuals and communities",
    descriptionNl: "Ondersteuning voor LGBTQ+ personen en gemeenschappen",
    icon: "heart",
    slug: "lgbtq",
  },
  {
    id: "homelessness",
    name: "Homelessness",
    nameNl: "Dakloosheid",
    description: "Assistance and shelter for homeless individuals",
    descriptionNl: "Hulp en opvang voor dakloos gemaakte personen",
    icon: "home",
    slug: "homelessness",
  },
  {
    id: "financial-debt",
    name: "Financial & Debt",
    nameNl: "Financiën & Schulden",
    description: "Help with financial problems, debt, and money management",
    descriptionNl: "Hulp bij financiële problemen, schulden en geldbeheerbouwen",
    icon: "wallet",
    slug: "financial-debt",
  },
  {
    id: "education-career",
    name: "Education & Career",
    nameNl: "Onderwijs & Carrière",
    description: "Guidance for education and career-related issues",
    descriptionNl: "Begeleiding bij onderwijs- en carrièregerelateerde kwesties",
    icon: "graduation",
    slug: "education-career",
  },
];

export default function handler(req, res) {
  const slug = req.query.slug;
  const category = categories.find((c) => c.slug === slug);
  
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }
  
  res.status(200).json(category);
}
