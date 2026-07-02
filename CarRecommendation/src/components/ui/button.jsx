import { forwardRef } from "react";

const Button = forwardRef(function Button({ className = "", variant = "default", ...props }, ref) {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
  };

  return <button ref={ref} className={`${base} ${variants[variant] || variants.default} ${className}`.trim()} {...props} />;
});

export { Button };
export default Button;
