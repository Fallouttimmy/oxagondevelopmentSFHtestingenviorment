import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import type { Category } from "@shared/schema";
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

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = iconMap[category.icon] || HelpCircle;

  return (
    <Link href={`/category/${category.slug}`}>
      <Card 
        className="h-full cursor-pointer hover-elevate active-elevate-2 transition-shadow"
        data-testid={`card-category-${category.slug}`}
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
              <IconComponent className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-lg mb-1" data-testid={`text-category-name-${category.slug}`}>
                {category.nameNl}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-category-desc-${category.slug}`}>
                {category.descriptionNl}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
