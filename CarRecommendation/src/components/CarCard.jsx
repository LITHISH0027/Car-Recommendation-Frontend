import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CarCard({ car }) {
  return (
    <Card className="min-w-[240px] max-w-[260px]">
      <CardHeader>
        <CardTitle className="text-base">
          {car.make} {car.model}{" "}
          <span className="text-muted-foreground font-normal">{car.variant}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="font-semibold">Rs.{car.price_lakhs}L</div>
        <div className="flex flex-wrap gap-1">
          <Badge variant="secondary">{car.fuel_type}</Badge>
          <Badge variant="secondary">{car.transmission}</Badge>
          <Badge variant="secondary">{car.seating_capacity} seats</Badge>
          <Badge variant="secondary">Safety {car.safety_rating}/5</Badge>
        </div>
        <p className="text-muted-foreground text-xs">{car.description}</p>
      </CardContent>
    </Card>
  );
}
