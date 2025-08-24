import React, { useState, useRef } from "react";
import { useClickOutside } from "./useClickOutside.hook";
import { Option } from "./MultiSelect.component";

const useMuiSelect = ({ selected, options, onChange }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpen(false));

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggleOption = (opt: Option) => {
    const already = selected.some((s) => s.id === opt.id);
    if (already) {
      onChange(selected.filter((s) => s.id !== opt.id));
    } else {
      onChange([...selected, opt]);
    }
    setSearch("");
    setIsOpen(true);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && search.trim()) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return {
    containerRef,
    isOpen,
    setIsOpen,
    search,
    setSearch,
    onKeyDown,
    filtered,
    toggleOption,
  };
};

export default useMuiSelect;
