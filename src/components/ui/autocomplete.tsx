import { useState, KeyboardEvent, ChangeEvent } from "react";
import { X } from "lucide-react";
import { toSlug } from "@/lib/utils";

interface Option {
  title: string;
  value: string;
}

interface AutocompleteProps {
  options: Option[];
  setOptions: (options: Option[]) => void;
  placeholder?: string;
}

export default function Autocomplete({
  options,
  setOptions,
  placeholder = "Gõ và nhấn Enter để thêm giá trị VD: Technology",
}: AutocompleteProps) {
  const [value, setValue] = useState("");

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      const exists = options.some(
        (option) => option.title.toLowerCase() === value.trim().toLowerCase()
      );
      if (!exists) {
        setOptions([
          ...options,
          { title: value.trim(), value: toSlug(value.trim()) },
        ]);
      }
      setValue("");
      e.preventDefault();
    }
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-grow flex-wrap gap-2 min-h-10 border bg-background border-border p-2 rounded-md">
      {options.map((option, index) => (
        <span
          key={index}
          className="h-6 text-sm px-2 py-0.5 border-border bg-accent rounded inline-flex items-center justify-center"
        >
          {option.title}
          <X
            strokeWidth={1}
            size={16}
            className="ml-2 cursor-pointer"
            onClick={() => removeOption(index)}
          />
        </span>
      ))}
      <input
        type="text"
        className="border-none focus:outline-none flex-grow text-sm"
        placeholder={placeholder}
        value={value}
        onChange={handleChangeValue}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
