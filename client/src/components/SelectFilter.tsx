import React from "react";

interface SelectFilterProps<T extends string> {
  label: string;
  value: T | "";
  onChange: (value: T | "") => void;
  options: { label: string; value: T }[];
  className?: string;
}

export function SelectFilter<T extends string>({
  label,
  value,
  onChange,
  options,
  className = "",
}: Readonly<SelectFilterProps<T>>) {
  return (
    <div>
      <label className="block text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value as T)}
        className={`border px-2 py-1 rounded ${className}`}
      >
        <option value="">All</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}