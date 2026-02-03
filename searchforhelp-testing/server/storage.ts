import { type User, type InsertUser, type Category, type Helpline } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getHelplines(): Promise<Helpline[]>;
  getHelplinesByCategory(categoryId: string): Promise<Helpline[]>;
  getFeaturedHelplines(): Promise<Helpline[]>;
  searchHelplines(query: string): Promise<Helpline[]>;
}

const categories: Category[] = [
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
    name: "LHBTQ+",
    nameNl: "LHBTQ+",
    description: "Support for LHBTQ+ individuals and their families",
    descriptionNl: "Ondersteuning voor LHBTQ+ personen en hun families",
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

const helplines: Helpline[] = [
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
    id: "mind-korrelatie",
    name: "MIND Korrelatie",
    description: "Mental health support and information",
    descriptionNl: "Ondersteuning en informatie over mentale gezondheid",
    phone: "0900-1450",
    website: "https://www.mindkorrelatie.nl",
    categoryId: "mental-health",
    hoursNl: "Ma-Vr 9:00-21:00",
    languages: ["Nederlands"],
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
    id: "slachtofferhulp",
    name: "Slachtofferhulp Nederland",
    description: "Support for victims of crimes, accidents, and disasters",
    descriptionNl: "Ondersteuning voor slachtoffers van misdrijven, ongelukken en rampen",
    phone: "0900-0101",
    website: "https://www.slachtofferhulp.nl",
    categoryId: "abuse-violence",
    hoursNl: "Ma-Vr 8:00-20:00, Za 9:00-17:00",
    languages: ["Nederlands", "Engels"],
  },
  {
    id: "centrum-seksueel-geweld",
    name: "Centrum Seksueel Geweld",
    description: "24/7 support for victims of sexual violence",
    descriptionNl: "24/7 ondersteuning voor slachtoffers van seksueel geweld",
    phone: "0800-0188",
    website: "https://www.centrumseksueelgeweld.nl",
    categoryId: "abuse-violence",
    hoursNl: "24/7 bereikbaar",
    languages: ["Nederlands"],
    isEmergency: true,
  },
  {
    id: "fier",
    name: "Fier",
    description: "Expert center for violence in dependency relationships",
    descriptionNl: "Expertisecentrum voor geweld in afhankelijkheidsrelaties",
    phone: "088-2084000",
    website: "https://www.fier.nl",
    categoryId: "abuse-violence",
    hoursNl: "24/7 bereikbaar",
    languages: ["Nederlands"],
  },
  {
    id: "drugsinfo",
    name: "Drugsinfo",
    description: "Information and support about drugs and addiction",
    descriptionNl: "Informatie en ondersteuning over drugs en verslaving",
    phone: "0900-1995",
    website: "https://www.drugsinfo.nl",
    categoryId: "addiction",
    hoursNl: "Ma-Vr 10:00-16:00",
    languages: ["Nederlands"],
  },
  {
    id: "anonieme-alcoholisten",
    name: "Anonieme Alcoholisten",
    description: "Support group for people with alcohol problems",
    descriptionNl: "Steungroep voor mensen met alcoholproblemen",
    phone: "020-6257877",
    website: "https://www.aa-nederland.nl",
    categoryId: "addiction",
    hoursNl: "24/7 bereikbaar",
    languages: ["Nederlands"],
  },
  {
    id: "agog",
    name: "AGOG - Gokken",
    description: "Support for gambling addiction",
    descriptionNl: "Ondersteuning bij gokverslaving",
    phone: "0900-2177721",
    website: "https://www.agog.nl",
    categoryId: "addiction",
    hoursNl: "Ma-Vr 9:00-17:00",
    languages: ["Nederlands"],
  },
  {
    id: "loket-kansspel",
    name: "Loket Kansspel",
    description: "Information and help with gambling problems",
    descriptionNl: "Informatie en hulp bij gokproblemen",
    phone: "0900-2029940",
    website: "https://www.loketkansspel.nl",
    categoryId: "addiction",
    hoursNl: "Ma-Vr 9:00-21:00",
    languages: ["Nederlands"],
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
  {
    id: "jongerenlijn",
    name: "De Jongerenlijn",
    description: "Support for young people aged 16-25",
    descriptionNl: "Ondersteuning voor jongeren van 16-25 jaar",
    phone: "0800-2000",
    website: "https://www.dejongerenlijn.nl",
    categoryId: "youth",
    hoursNl: "Dagelijks bereikbaar",
    languages: ["Nederlands"],
  },
  {
    id: "113-jongeren",
    name: "113 Jongeren",
    description: "Suicide prevention specifically for young people",
    descriptionNl: "Zelfmoordpreventie speciaal voor jongeren",
    phone: "113",
    website: "https://www.113.nl/ik-denk-aan-zelfmoord/hulp-voor-jongeren",
    categoryId: "youth",
    hoursNl: "24/7 bereikbaar",
    languages: ["Nederlands"],
    isEmergency: true,
  },
  {
    id: "coc-nederland",
    name: "COC Nederland",
    description: "LGBTQ+ rights organization with support services",
    descriptionNl: "LGBTQ+ belangenorganisatie met ondersteuningsdiensten",
    phone: "020-6234596",
    website: "https://www.coc.nl",
    categoryId: "lgbtq",
    hoursNl: "Ma-Vr 9:00-17:00",
    languages: ["Nederlands", "Engels"],
  },
  {
    id: "switchboard",
    name: "Switchboard",
    description: "Information and support for LGBTQ+ individuals",
    descriptionNl: "Informatie en ondersteuning voor LGBTQ+ personen",
    phone: "020-6232510",
    website: "https://www.switchboard.nl",
    categoryId: "lgbtq",
    hoursNl: "Ma-Vr 10:00-22:00",
    languages: ["Nederlands", "Engels"],
  },
  {
    id: "transgender-netwerk",
    name: "Transgender Netwerk Nederland",
    description: "Support and information for transgender people",
    descriptionNl: "Ondersteuning en informatie voor transgender personen",
    website: "https://www.transgendernetwerk.nl",
    categoryId: "lgbtq",
    hoursNl: "Via website",
    languages: ["Nederlands"],
  },
  {
    id: "veilig-thuis-huiselijk",
    name: "Veilig Thuis - Huiselijk Geweld",
    description: "Support for domestic violence situations",
    descriptionNl: "Ondersteuning bij huiselijk geweld situaties",
    phone: "0800-2000",
    website: "https://www.veiligthuis.nl",
    categoryId: "domestic",
    hoursNl: "24/7 bereikbaar",
    languages: ["Nederlands"],
    isEmergency: true,
  },
  {
    id: "blijf-groep",
    name: "Blijf Groep",
    description: "Emergency shelter and support for domestic violence",
    descriptionNl: "Opvang en ondersteuning bij huiselijk geweld",
    phone: "0900-2015550",
    website: "https://www.blijfgroep.nl",
    categoryId: "domestic",
    hoursNl: "24/7 bereikbaar",
    languages: ["Nederlands"],
  },
  {
    id: "fiom",
    name: "Fiom",
    description: "Support for unplanned pregnancy and adoption",
    descriptionNl: "Ondersteuning bij ongewenste zwangerschap en adoptie",
    phone: "088-1264646",
    website: "https://www.fiom.nl",
    categoryId: "domestic",
    hoursNl: "Ma-Vr 9:00-17:00",
    languages: ["Nederlands"],
  },
  {
    id: "nibud",
    name: "Nibud",
    description: "Financial advice and budgeting support",
    descriptionNl: "Financieel advies en budgetondersteuning",
    website: "https://www.nibud.nl",
    categoryId: "financial",
    hoursNl: "Via website",
    languages: ["Nederlands"],
  },
  {
    id: "schuldhulplijn",
    name: "Schuldhulplijn",
    description: "Free advice for debt problems",
    descriptionNl: "Gratis advies bij schulden problemen",
    phone: "0800-8115",
    website: "https://www.nvvk.nl",
    categoryId: "financial",
    hoursNl: "Ma-Vr 9:00-17:00",
    languages: ["Nederlands"],
  },
  {
    id: "geldfit",
    name: "Geldfit",
    description: "Test and get help with financial problems",
    descriptionNl: "Test en krijg hulp bij financiële problemen",
    phone: "0800-8115",
    website: "https://www.geldfit.nl",
    categoryId: "financial",
    hoursNl: "Ma-Vr 9:00-21:00",
    languages: ["Nederlands"],
  },
  {
    id: "juridisch-loket",
    name: "Het Juridisch Loket",
    description: "Free legal advice and information",
    descriptionNl: "Gratis juridisch advies en informatie",
    phone: "0900-8020",
    website: "https://www.juridischloket.nl",
    categoryId: "legal",
    hoursNl: "Ma-Vr 9:00-18:00",
    languages: ["Nederlands"],
  },
  {
    id: "advocaat-piket",
    name: "Piketcentrale Advocatuur",
    description: "Emergency legal assistance 24/7",
    descriptionNl: "Spoedeisende juridische hulp 24/7",
    phone: "088-8996900",
    website: "https://www.advocatenorde.nl",
    categoryId: "legal",
    hoursNl: "24/7 bereikbaar",
    languages: ["Nederlands"],
  },
];

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCategories(): Promise<Category[]> {
    return categories;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return categories.find((c) => c.slug === slug);
  }

  async getHelplines(): Promise<Helpline[]> {
    return helplines;
  }

  async getHelplinesByCategory(categoryId: string): Promise<Helpline[]> {
    return helplines.filter((h) => h.categoryId === categoryId);
  }

  async getFeaturedHelplines(): Promise<Helpline[]> {
    return helplines.filter((h) => h.isFeatured);
  }

  async searchHelplines(query: string): Promise<Helpline[]> {
    const lowerQuery = query.toLowerCase();
    return helplines.filter(
      (h) =>
        h.name.toLowerCase().includes(lowerQuery) ||
        h.descriptionNl.toLowerCase().includes(lowerQuery) ||
        h.description.toLowerCase().includes(lowerQuery) ||
        (h.phone && h.phone.includes(query))
    );
  }
}

export const storage = new MemStorage();
