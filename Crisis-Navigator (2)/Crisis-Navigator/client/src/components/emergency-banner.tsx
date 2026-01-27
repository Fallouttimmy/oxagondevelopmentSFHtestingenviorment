import { Phone, AlertTriangle } from "lucide-react";

export function EmergencyBanner() {
  return (
    <div className="bg-destructive text-destructive-foreground">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm font-medium">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Noodgeval?</span>
          </div>
          <a
            href="tel:112"
            className="flex items-center gap-2 rounded-md px-3 py-1 bg-destructive-foreground/10 transition-colors hover:bg-destructive-foreground/20"
            data-testid="link-emergency-112"
          >
            <Phone className="w-4 h-4" />
            <span className="font-bold">112</span>
            <span className="hidden sm:inline">- Alarmnummer</span>
          </a>
          <a
            href="tel:113"
            className="flex items-center gap-2 rounded-md px-3 py-1 bg-destructive-foreground/10 transition-colors hover:bg-destructive-foreground/20"
            data-testid="link-emergency-113"
          >
            <Phone className="w-4 h-4" />
            <span className="font-bold">113</span>
            <span className="hidden sm:inline">- Zelfmoordpreventie</span>
          </a>
          <a
            href="tel:0800-0113"
            className="flex items-center gap-2 rounded-md px-3 py-1 bg-destructive-foreground/10 transition-colors hover:bg-destructive-foreground/20"
            data-testid="link-emergency-0800"
          >
            <Phone className="w-4 h-4" />
            <span className="font-bold">0800-0113</span>
            <span className="hidden sm:inline">- Gratis</span>
          </a>
        </div>
      </div>
    </div>
  );
}
