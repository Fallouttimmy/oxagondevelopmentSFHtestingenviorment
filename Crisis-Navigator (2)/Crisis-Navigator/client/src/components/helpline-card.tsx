import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, ExternalLink, Clock, Globe } from "lucide-react";
import type { Helpline } from "@shared/schema";

interface HelplineCardProps {
  helpline: Helpline;
}

export function HelplineCard({ helpline }: HelplineCardProps) {
  return (
    <Card 
      className="hover-elevate"
      data-testid={`card-helpline-${helpline.id}`}
    >
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <h3 className="font-medium text-lg" data-testid={`text-helpline-name-${helpline.id}`}>
                  {helpline.name}
                </h3>
                {helpline.isEmergency && (
                  <Badge variant="destructive" className="text-xs">
                    Noodlijn
                  </Badge>
                )}
                {helpline.isFeatured && (
                  <Badge variant="secondary" className="text-xs">
                    Aanbevolen
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3" data-testid={`text-helpline-desc-${helpline.id}`}>
                {helpline.descriptionNl}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {helpline.hoursNl && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{helpline.hoursNl}</span>
                  </div>
                )}
                {helpline.languages && helpline.languages.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4" />
                    <span>{helpline.languages.join(", ")}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {helpline.phone && (
              <a href={`tel:${helpline.phone.replace(/\s/g, "")}`} data-testid={`link-phone-${helpline.id}`}>
                <Button className="gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="font-mono font-semibold">{helpline.phone}</span>
                </Button>
              </a>
            )}
            {helpline.website && (
              <a 
                href={helpline.website} 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid={`link-website-${helpline.id}`}
              >
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Website
                </Button>
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
