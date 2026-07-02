import { useState } from "react";

function ToggleGroup({ value, onValueChange, children, className = "" }) {
  const [selected, setSelected] = useState(value || []);

  const handleToggle = (itemValue) => {
    const next = selected.includes(itemValue)
      ? selected.filter((value) => value !== itemValue)
      : [...selected, itemValue];

    setSelected(next);
    onValueChange?.(next);
  };

  return <div className={className}>{children.map((child) => cloneElement(child, { selected: selected.includes(child.props.value), onToggle: handleToggle }))}</div>;
}

function ToggleGroupItem({ value, children, className = "", selected = false, onToggle }) {
  return (
    <button type="button" className={`${className} ${selected ? "bg-primary text-primary-foreground" : ""}`.trim()} onClick={() => onToggle?.(value)}>
      {children}
    </button>
  );
}

function cloneElement(element, props) {
  return { ...element, props: { ...element.props, ...props } };
}

export { ToggleGroup, ToggleGroupItem };
export default ToggleGroup;
