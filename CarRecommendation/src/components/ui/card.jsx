import { forwardRef } from "react";

const Card = forwardRef(function Card({ className = "", ...props }, ref) {
  return <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`.trim()} {...props} />;
});

function CardHeader({ className = "", ...props }) {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`.trim()} {...props} />;
}

function CardTitle({ className = "", ...props }) {
  return <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`.trim()} {...props} />;
}

function CardContent({ className = "", ...props }) {
  return <div className={`p-6 pt-0 ${className}`.trim()} {...props} />;
}

export { Card, CardHeader, CardTitle, CardContent };
export default Card;
