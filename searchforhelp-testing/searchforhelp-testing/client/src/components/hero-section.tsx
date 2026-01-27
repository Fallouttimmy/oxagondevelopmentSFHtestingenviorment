import { Search, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4" data-testid="text-hero-title">
            Vind de juiste hulp wanneer je het nodig hebt
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8" data-testid="text-hero-subtitle">
            Alle hulplijnen in Nederland op één plek. Voor mentale gezondheid, 
            misbruik, verslaving, en meer.
          </p>

          <div className="relative max-w-lg mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Waar heb je hulp bij nodig?"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 h-12 text-base bg-background text-foreground"
              data-testid="input-hero-search"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:112" data-testid="button-hero-112">
              <Button variant="secondary" className="gap-2">
                <Phone className="w-4 h-4" />
                112 - Noodgeval
              </Button>
            </a>
            <a href="tel:113" data-testid="button-hero-113">
              <Button variant="secondary" className="gap-2">
                <Phone className="w-4 h-4" />
                113 - Zelfmoordpreventie
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
