import { Search, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ThemeToggle } from "@/components/theme-toggle";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const categories = [
  { name: "Mentale Gezondheid", slug: "mental-health" },
  { name: "Misbruik & Geweld", slug: "abuse-violence" },
  { name: "Verslaving", slug: "addiction" },
  { name: "Jeugd & Kinderen", slug: "youth" },
  { name: "LGBTQ+", slug: "lgbtq" },
  { name: "Huiselijke Problemen", slug: "domestic" },
  { name: "Financiële Hulp", slug: "financial" },
  { name: "Juridische Hulp", slug: "legal" },
];

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 h-16">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SH</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-semibold text-lg leading-tight">Searchforhelp</h1>
                <p className="text-xs text-muted-foreground">1.0.0 CB</p>
              </div>
            </div>
          </Link>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Zoek hulplijnen..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/">
              <Button
                variant={location === "/" ? "secondary" : "ghost"}
                size="sm"
                data-testid="link-nav-home"
              >
                Home
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={location.startsWith("/category") ? "secondary" : "ghost"}
                  size="sm"
                  className="gap-1"
                  data-testid="button-categories-dropdown"
                >
                  Categorieën
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {categories.map((cat) => (
                  <Link key={cat.slug} href={`/category/${cat.slug}`}>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      data-testid={`link-dropdown-${cat.slug}`}
                    >
                      {cat.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
                <Link href="/categories">
                  <DropdownMenuItem
                    className="cursor-pointer font-medium border-t mt-1 pt-2"
                    data-testid="link-dropdown-all"
                  >
                    Bekijk alle categorieën
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/about">
              <Button
                variant={location === "/about" ? "secondary" : "ghost"}
                size="sm"
                data-testid="link-nav-about"
              >
                Over ons
              </Button>
            </Link>
            
            <ThemeToggle />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Zoek hulplijnen..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
              data-testid="input-search-mobile"
            />
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t pt-4">
            <div className="flex flex-col gap-1">
              <Link href="/">
                <Button
                  variant={location === "/" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="link-nav-mobile-home"
                >
                  Home
                </Button>
              </Link>
              <div className="py-2">
                <p className="text-xs font-medium text-muted-foreground px-4 mb-2">Categorieën</p>
                {categories.map((cat) => (
                  <Link key={cat.slug} href={`/category/${cat.slug}`}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start pl-6 text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-nav-mobile-${cat.slug}`}
                    >
                      {cat.name}
                    </Button>
                  </Link>
                ))}
              </div>
              <Link href="/about">
                <Button
                  variant={location === "/about" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="link-nav-mobile-about"
                >
                  Over ons
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
