import React, { useState, useRef } from "react";
import styles from "./MultiSelect.module.scss";
import { useClickOutside } from "./useClickOutside.hook";

export interface Option {
  id: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: Option[];
  onChange: (items: Option[]) => void;
  placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  placeholder = "Select…",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpen(false));

  const filtered = options.filter(
    (o) =>
      o.label.toLowerCase().includes(search.toLowerCase()) &&
      !selected.some((s) => s.id === o.id)
  );

  const addNewOption = () => {
    const newOpt = { id: crypto.randomUUID(), label: search };
    onChange([...selected, newOpt]);
    setSearch("");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && search.trim()) {
      e.preventDefault();
      addNewOption();
      setIsOpen(true);
    }
  };

  return (
    <div
      className={styles.multiSelect}
      ref={containerRef}
      onClick={() => setIsOpen(true)}
    >
      <div className={styles.tags}>
        {selected.map((item) => (
          <span key={item.id} className={styles.tag}>
            {item.label}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(selected.filter((s) => s.id !== item.id));
              }}
              className={styles.removeBtn}
            >
              ×
            </button>
          </span>
        ))}
        <input
          className={styles.input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={selected.length === 0 ? placeholder : ""}
        />
      </div>
      {isOpen && (
        <ul className={styles.dropdown}>
          {filtered.map((o) => (
            <li
              key={o.id}
              className={styles.option}
              onClick={() => {
                onChange([...selected, o]);
                setSearch("");
                setIsOpen(true);
              }}
            >
              {o.label}
            </li>
          ))}
          {search && !options.some((o) => o.label === search) && (
            <li className={styles.newOption} onClick={addNewOption}>
              Add "{search}"
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
