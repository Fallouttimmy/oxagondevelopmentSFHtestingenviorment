import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Phone, Clock, Users, Globe } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Phone,
      title: "Direct bellen",
      description: "Alle telefoonnummers zijn direct te bellen met één klik.",
    },
    {
      icon: Clock,
      title: "24/7 beschikbaar",
      description: "Veel hulplijnen zijn dag en nacht bereikbaar.",
    },
    {
      icon: Shield,
      title: "Anoniem & vertrouwelijk",
      description: "Je kunt anoniem bellen en gesprekken zijn vertrouwelijk.",
    },
    {
      icon: Users,
      title: "Professionele hulp",
      description: "Getrainde vrijwilligers en professionals staan voor je klaar.",
    },
    {
      icon: Heart,
      title: "Gratis hulplijnen",
      description: "De meeste hulplijnen zijn volledig gratis te bellen.",
    },
    {
      icon: Globe,
      title: "Meertalige ondersteuning",
      description: "Verschillende hulplijnen bieden ondersteuning in meerdere talen.",
    },
  ];

  return (
    <div className="pb-20 md:pb-0">
      <div className="bg-muted/30 border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-semibold mb-2" data-testid="text-about-title">
            Over Searchforhelp
          </h1>
          <p className="text-muted-foreground max-w-2xl" data-testid="text-about-subtitle">
            Searchforhelp 1.0.0 CB verzamelt alle hulplijnen in Nederland op één plek, 
            zodat je snel de juiste hulp kunt vinden wanneer je het nodig hebt.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Onze missie</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                In Nederland zijn er tientallen hulplijnen voor verschillende problemen. 
                Maar wanneer je in nood bent, wil je niet zoeken naar het juiste nummer. 
                Daarom hebben wij Searchforhelp gemaakt: één overzichtelijke plek waar je 
                alle hulplijnen kunt vinden.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Of je nu te maken hebt met mentale problemen, huiselijk geweld, verslaving, 
                of andere zorgen - wij helpen je de juiste hulplijn te vinden. Alle informatie 
                is gratis toegankelijk en je kunt direct bellen door op het telefoonnummer te klikken.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Wat wij bieden</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Noodgevallen</h2>
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">
                    In geval van nood, bel direct:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <a 
                        href="tel:112" 
                        className="font-mono font-bold text-lg text-destructive hover:underline"
                        data-testid="link-about-112"
                      >
                        112
                      </a>
                      <span className="text-muted-foreground">- Algemeen alarmnummer (levensbedreigende situaties)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <a 
                        href="tel:113" 
                        className="font-mono font-bold text-lg text-destructive hover:underline"
                        data-testid="link-about-113"
                      >
                        113
                      </a>
                      <span className="text-muted-foreground">- Zelfmoordpreventie (24/7 bereikbaar)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <a 
                        href="tel:0800-0113" 
                        className="font-mono font-bold text-lg text-destructive hover:underline"
                        data-testid="link-about-0800"
                      >
                        0800-0113
                      </a>
                      <span className="text-muted-foreground">- Gratis nummer zelfmoordpreventie</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Contact</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4">
                Heb je een hulplijn die ontbreekt op onze site? Of heb je feedback over 
                de informatie op deze pagina? Neem dan contact met ons op.
              </p>
              <p className="text-sm text-muted-foreground">
                E-mail: info@searchforhelp.nl
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                Let op: Searchforhelp biedt zelf geen hulpverlening. 
                Wij verzamelen alleen informatie over bestaande hulplijnen in Nederland.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
