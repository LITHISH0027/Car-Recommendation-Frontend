import { createContext, useContext } from "react";

const SelectContext = createContext(null);

function Select({ value, onValueChange, children, className = "" }) {
  return (
    <SelectContext.Provider value={{ value, onValueChange }}>
      <div className={`w-full ${className}`.trim()}>{children}</div>
    </SelectContext.Provider>
  );
}

function SelectTrigger({ className = "", children, ...props }) {
  return (
    <button type="button" className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

function SelectValue({ placeholder = "Select" }) {
  const { value } = useContext(SelectContext);
  return <span>{value || placeholder}</span>;
}

function SelectContent({ className = "", children, ...props }) {
  return <div className={`mt-1 space-y-1 rounded-md border bg-background p-1 shadow ${className}`.trim()} {...props}>{children}</div>;
}

function SelectItem({ value: itemValue, className = "", children, ...props }) {
  const { onValueChange } = useContext(SelectContext);
  return (
    <button type="button" className={`flex w-full items-center rounded px-2 py-1 text-left text-sm hover:bg-accent ${className}`.trim()} onClick={() => onValueChange?.(itemValue)} {...props}>
      {children}
    </button>
  );
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
export default Select;
