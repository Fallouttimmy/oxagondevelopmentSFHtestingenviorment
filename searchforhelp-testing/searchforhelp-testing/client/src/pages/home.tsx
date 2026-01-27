import { useQuery } from "@tanstack/react-query";
import { HeroSection } from "@/components/hero-section";
import { CategoryCard } from "@/components/category-card";
import { HelplineCard } from "@/components/helpline-card";
import { CategoriesGridSkeleton, HelplinesListSkeleton } from "@/components/loading-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Category, Helpline } from "@shared/schema";

interface HomeProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Home({ searchQuery, onSearchChange }: HomeProps) {
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: featuredHelplines, isLoading: helplinesLoading } = useQuery<Helpline[]>({
    queryKey: ["/api/helplines/featured"],
  });

  const { data: searchResults, isLoading: searchLoading } = useQuery<Helpline[]>({
    queryKey: ["/api/helplines/search", searchQuery],
    enabled: searchQuery.length >= 2,
  });

  const showSearchResults = searchQuery.length >= 2;

  return (
    <div>
      <HeroSection searchQuery={searchQuery} onSearchChange={onSearchChange} />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {showSearchResults ? (
          <section>
            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
              <h2 className="text-2xl font-semibold" data-testid="text-search-results-title">
                Zoekresultaten voor "{searchQuery}"
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSearchChange("")}
                data-testid="button-clear-search"
              >
                Wis zoekopdracht
              </Button>
            </div>
            {searchLoading ? (
              <HelplinesListSkeleton />
            ) : searchResults && searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((helpline) => (
                  <HelplineCard key={helpline.id} helpline={helpline} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground mb-4" data-testid="text-no-results">
                    Geen hulplijnen gevonden voor "{searchQuery}"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Probeer andere zoektermen of bekijk de categorieën hieronder.
                  </p>
                </CardContent>
              </Card>
            )}
          </section>
        ) : (
          <>
            <section className="mb-12">
              <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                <h2 className="text-2xl font-semibold" data-testid="text-categories-title">
                  Categorieën
                </h2>
                <Link href="/categories">
                  <Button variant="ghost" size="sm" className="gap-1" data-testid="link-all-categories">
                    Bekijk alle
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              {categoriesLoading ? (
                <CategoriesGridSkeleton />
              ) : categories ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.slice(0, 6).map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>
              ) : null}
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6" data-testid="text-featured-title">
                Veelgebruikte hulplijnen
              </h2>
              {helplinesLoading ? (
                <HelplinesListSkeleton />
              ) : featuredHelplines ? (
                <div className="space-y-4">
                  {featuredHelplines.slice(0, 4).map((helpline) => (
                    <HelplineCard key={helpline.id} helpline={helpline} />
                  ))}
                </div>
              ) : null}
            </section>

            <section>
              <Card className="bg-muted/50">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Info className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2" data-testid="text-info-title">
                        Hoe werkt Searchforhelp?
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Searchforhelp verzamelt alle hulplijnen in Nederland op één plek. 
                        Je kunt zoeken op onderwerp, bladeren door categorieën, of direct 
                        bellen naar een hulplijn.
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Alle telefoonnummers zijn direct te bellen</li>
                        <li>• Veel hulplijnen zijn 24/7 bereikbaar</li>
                        <li>• De meeste hulplijnen zijn gratis</li>
                        <li>• Je kunt anoniem bellen</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
