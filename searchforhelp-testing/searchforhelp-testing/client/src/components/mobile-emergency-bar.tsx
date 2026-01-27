import { Phone, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileEmergencyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-destructive text-destructive-foreground p-3 z-50 border-t-2 border-destructive-foreground/20 shadow-lg">
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <AlertTriangle className="w-4 h-4" />
          <span>Nood?</span>
        </div>
        <a href="tel:112" data-testid="link-mobile-112">
          <Button size="sm" variant="secondary" className="gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            112
          </Button>
        </a>
        <a href="tel:113" data-testid="link-mobile-113">
          <Button size="sm" variant="secondary" className="gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            113
          </Button>
        </a>
      </div>
    </div>
  );
}
