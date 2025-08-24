import React, { useState, useRef } from "react";
import styles from "./MultiSelect.module.scss";
import { useClickOutside } from "./useClickOutside.hook";
import { ReactComponent as ChevronDown } from "../../assets/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../../assets/chevron-up.svg";
import { ReactComponent as CheckMark } from "../../assets/check-mark.svg";

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

  return (
    <div
      ref={containerRef}
      className={styles.multiSelect}
      data-open={isOpen}
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

      <span
        className={styles.chevron}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((o) => !o);
        }}
      >
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </span>

      {isOpen && (
        <ul className={styles.dropdown}>
          {filtered.map((o) => {
            const isSelected = selected.some((s) => s.id === o.id);
            return (
              <li
                key={o.id}
                className={[
                  styles.option,
                  isSelected ? styles.isSelected : null,
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => toggleOption(o)}
              >
                <span>{o.label}</span>
                {isSelected && (
                  <span className={styles.checkIcon}>
                    <CheckMark />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
