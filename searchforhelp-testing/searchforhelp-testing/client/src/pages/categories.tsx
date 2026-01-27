import { useQuery } from "@tanstack/react-query";
import { CategoryCard } from "@/components/category-card";
import { CategoriesGridSkeleton } from "@/components/loading-skeleton";
import type { Category } from "@shared/schema";

export default function Categories() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <div className="pb-20 md:pb-0">
      <div className="bg-muted/30 border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-semibold mb-2" data-testid="text-categories-page-title">
            Alle Categorieën
          </h1>
          <p className="text-muted-foreground" data-testid="text-categories-page-desc">
            Blader door alle categorieën om de juiste hulplijn te vinden.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {isLoading ? (
          <CategoriesGridSkeleton />
        ) : categories ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : null}
      </main>
    </div>
  );
}
