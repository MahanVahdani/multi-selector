import React from "react";
import styles from "./MultiSelect.module.scss";
import { ReactComponent as ChevronDown } from "../../assets/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../../assets/chevron-up.svg";
import { ReactComponent as CheckMark } from "../../assets/check-mark.svg";
import useMuiSelect, { UseMuiSelectReturn } from "./useMuiSelect.hook";

export interface Option {
  id: string;
  label: string;
}

export interface MultiSelectProps {
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
  const {
    containerRef,
    isOpen,
    setIsOpen,
    search,
    setSearch,
    onKeyDown,
    filtered,
    toggleOption,
  }: UseMuiSelectReturn = useMuiSelect({ options, selected, onChange });

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
              className={styles.removeBtn}
              onClick={(e) => {
                e.stopPropagation();
                onChange(selected.filter((s) => s.id !== item.id));
              }}
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
