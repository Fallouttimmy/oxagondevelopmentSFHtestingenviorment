import { Link } from "wouter";
import { Heart, Mail, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: "Mentale Gezondheid", slug: "mental-health" },
    { name: "Misbruik & Geweld", slug: "abuse-violence" },
    { name: "Verslaving", slug: "addiction" },
    { name: "Jeugd & Kinderen", slug: "youth" },
    { name: "LGBTQ+", slug: "lgbtq" },
    { name: "Huiselijk Geweld", slug: "domestic" },
  ];

  return (
    <footer className="bg-card border-t mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SH</span>
              </div>
              <div>
                <h3 className="font-semibold">Searchforhelp</h3>
                <p className="text-xs text-muted-foreground">1.0.0 CB</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Alle hulplijnen in Nederland op één plek. Wij helpen je de juiste 
              ondersteuning te vinden wanneer je het nodig hebt.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>Noodgeval: 112 | Zelfmoordpreventie: 113</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Categorieën</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`}>
                    <span 
                      className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                      data-testid={`link-footer-${cat.slug}`}
                    >
                      {cat.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Over Searchforhelp</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                    Over ons
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/categories">
                  <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                    Alle categorieën
                  </span>
                </Link>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Mail className="w-4 h-4" />
                info@searchforhelp.nl
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Laatst bijgewerkt: December 2024
          </p>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Gemaakt met <Heart className="w-4 h-4 text-destructive" /> in Nederland
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © {currentYear} Searchforhelp 1.0.0 CB. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
