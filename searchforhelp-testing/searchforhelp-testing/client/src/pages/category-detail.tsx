import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { HelplineCard } from "@/components/helpline-card";
import { HelplinesListSkeleton } from "@/components/loading-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import type { Category, Helpline } from "@shared/schema";
import {
  Heart,
  Shield,
  Baby,
  Users,
  Brain,
  Home,
  Pill,
  Phone,
  Scale,
  Wallet,
  GraduationCap,
  HelpCircle,
} from "lucide-react";

const iconMap: Record<string, typeof Heart> = {
  heart: Heart,
  shield: Shield,
  baby: Baby,
  users: Users,
  brain: Brain,
  home: Home,
  pill: Pill,
  phone: Phone,
  scale: Scale,
  wallet: Wallet,
  graduation: GraduationCap,
  help: HelpCircle,
};

export default function CategoryDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data: category, isLoading: categoryLoading } = useQuery<Category>({
    queryKey: ["/api/categories", slug],
  });

  const { data: helplines, isLoading: helplinesLoading } = useQuery<Helpline[]>({
    queryKey: ["/api/helplines/category", slug],
  });

  const IconComponent = category ? (iconMap[category.icon] || HelpCircle) : HelpCircle;

  if (categoryLoading) {
    return (
      <div className="pb-20 md:pb-0">
        <div className="bg-muted/30 border-b">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-muted rounded mb-2" />
              <div className="h-4 w-96 bg-muted rounded" />
            </div>
          </div>
        </div>
        <main className="max-w-6xl mx-auto px-4 py-8">
          <HelplinesListSkeleton />
        </main>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="pb-20 md:pb-0">
        <main className="max-w-6xl mx-auto px-4 py-12">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">Categorie niet gevonden</h2>
              <p className="text-muted-foreground mb-4">
                Deze categorie bestaat niet of is verwijderd.
              </p>
              <Link href="/categories">
                <Button>Terug naar categorieën</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="pb-20 md:pb-0">
      <div className="bg-muted/30 border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link href="/categories">
            <Button variant="ghost" size="sm" className="mb-4 gap-1 -ml-2" data-testid="link-back-categories">
              <ChevronLeft className="w-4 h-4" />
              Alle categorieën
            </Button>
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <IconComponent className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold mb-2" data-testid="text-category-detail-title">
                {category.nameNl}
              </h1>
              <p className="text-muted-foreground" data-testid="text-category-detail-desc">
                {category.descriptionNl}
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-lg font-medium mb-4 text-muted-foreground">
          {helplinesLoading ? "Laden..." : `${helplines?.length || 0} hulplijnen gevonden`}
        </h2>
        
        {helplinesLoading ? (
          <HelplinesListSkeleton />
        ) : helplines && helplines.length > 0 ? (
          <div className="space-y-4">
            {helplines.map((helpline) => (
              <HelplineCard key={helpline.id} helpline={helpline} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                Geen hulplijnen gevonden in deze categorie.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
