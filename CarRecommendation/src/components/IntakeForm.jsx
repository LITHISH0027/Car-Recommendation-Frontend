import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const PRIORITIES = [
  "safety",
  "mileage",
  "performance",
  "features",
  "boot_space",
  "low_maintenance",
  "resale_value",
];

const PRIORITY_LABELS = {
  safety: "Safety",
  mileage: "Mileage",
  performance: "Performance",
  features: "Features",
  boot_space: "Boot Space",
  low_maintenance: "Low Maintenance",
  resale_value: "Resale Value",
};

export default function IntakeForm({ onSubmit, loading }) {
  const [budget, setBudget] = useState(15);
  const [people, setPeople] = useState(4);
  const [primaryUse, setPrimaryUse] = useState("mixed");
  const [fuel, setFuel] = useState("no_preference");
  const [transmission, setTransmission] = useState("no_preference");
  const [priorities, setPriorities] = useState([]);
  const [extra, setExtra] = useState("");

  const togglePriority = (values) => {
    if (values.length <= 3) setPriorities(values);
  };

  const handleSubmit = () => {
    onSubmit({
      budget_max: Number(budget),
      people: Number(people),
      primary_use: primaryUse,
      fuel_preference: fuel,
      transmission_preference: transmission,
      priorities,
      additional_requirements: extra,
    });
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Find your car</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Budget (Rs. lakhs)</label>
          <Input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            min={2}
            max={50}
          />
        </div>

        <div>
          <label className="text-sm font-medium">People who usually travel</label>
          <Input
            type="number"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            min={1}
            max={13}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Primary use</label>
          <Select value={primaryUse} onValueChange={setPrimaryUse}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="city">City commute</SelectItem>
              <SelectItem value="highway">Highway</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
              <SelectItem value="off_road">Off-road</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Fuel preference</label>
          <Select value={fuel} onValueChange={setFuel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="petrol">Petrol</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="ev">EV</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="no_preference">No preference</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Transmission</label>
          <Select value={transmission} onValueChange={setTransmission}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="automatic">Automatic</SelectItem>
              <SelectItem value="no_preference">No preference</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Top priorities (pick up to 3)</label>
          <ToggleGroup
            type="multiple"
            value={priorities}
            onValueChange={togglePriority}
            className="flex flex-wrap gap-2 mt-1"
          >
            {PRIORITIES.map((p) => (
              <ToggleGroupItem
                key={p}
                value={p}
                className="border px-3 py-1 rounded-full text-sm data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                {PRIORITY_LABELS[p]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div>
          <label className="text-sm font-medium">Additional requirements (optional)</label>
          <Textarea
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
            placeholder="e.g. need it for a travel agency, frequent long trips"
          />
        </div>

        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? "Finding cars..." : "Find my car"}
        </Button>
      </CardContent>
    </Card>
  );
}
