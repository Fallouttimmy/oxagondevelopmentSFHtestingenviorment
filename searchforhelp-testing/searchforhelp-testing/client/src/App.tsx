import { Switch, Route } from "wouter";
import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { EmergencyBanner } from "@/components/emergency-banner";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileEmergencyBar } from "@/components/mobile-emergency-bar";
import Home from "@/pages/home";
import Categories from "@/pages/categories";
import CategoryDetail from "@/pages/category-detail";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";

function Router({ searchQuery, onSearchChange }: { searchQuery: string; onSearchChange: (q: string) => void }) {
  return (
    <Switch>
      <Route path="/">
        <Home searchQuery={searchQuery} onSearchChange={onSearchChange} />
      </Route>
      <Route path="/categories" component={Categories} />
      <Route path="/category/:slug" component={CategoryDetail} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col bg-background">
            <EmergencyBanner />
            <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <div className="flex-1 pb-20 md:pb-0">
              <Router searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            </div>
            <Footer />
            <MobileEmergencyBar />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
