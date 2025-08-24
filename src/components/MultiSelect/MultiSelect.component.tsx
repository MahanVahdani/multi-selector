import React, { useCallback, ChangeEvent, RefObject } from "react";
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

//  Single tag with remove button
const TagItem = React.memo(
  ({ item, onRemove }: { item: Option; onRemove: (opt: Option) => void }) => {
    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onRemove(item);
      },
      [item, onRemove]
    );

    return (
      <span className={styles.tag}>
        {item.label}
        <button
          type="button"
          className={styles.removeBtn}
          onClick={handleClick}
          aria-label={`Remove ${item.label}`}
        >
          ×
        </button>
      </span>
    );
  }
);

// List of tags
const TagList = React.memo(
  ({
    selected,
    onRemove,
  }: {
    selected: Option[];
    onRemove: (opt: Option) => void;
  }) => (
    <>
      {selected.map((item) => (
        <TagItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </>
  )
);

// One dropdown option row
const OptionItem = React.memo(
  ({
    option,
    isSelected,
    onToggle,
  }: {
    option: Option;
    isSelected: boolean;
    onToggle: (opt: Option) => void;
  }) => {
    const handleClick = useCallback(() => {
      onToggle(option);
    }, [onToggle, option]);

    return (
      <li
        className={`${styles.option} ${isSelected ? styles.isSelected : ""}`}
        onClick={handleClick}
      >
        <span>{option.label}</span>
        {isSelected && (
          <span className={styles.checkIcon}>
            <CheckMark />
          </span>
        )}
      </li>
    );
  }
);

// The dropdown list
const DropdownList = React.memo(
  ({
    filtered,
    selected,
    onToggle,
  }: {
    filtered: Option[];
    selected: Option[];
    onToggle: (opt: Option) => void;
  }) => (
    <ul className={styles.dropdown}>
      {filtered.map((opt) => {
        const selectedFlag = selected.some((s) => s.id === opt.id);
        return (
          <OptionItem
            key={opt.id}
            option={opt}
            isSelected={selectedFlag}
            onToggle={onToggle}
          />
        );
      })}
    </ul>
  )
);

// Chevron toggle button
const ChevronToggle = React.memo(
  ({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) => {
    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggle();
      },
      [onToggle]
    );
    return (
      <span className={styles.chevron} onClick={handleClick}>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </span>
    );
  }
);

// Main MultiSelect component
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
  }: UseMuiSelectReturn = useMuiSelect({
    options,
    selected,
    onChange,
  });

  const handleRemove = useCallback(
    (opt: Option) => {
      onChange(selected.filter((s) => s.id !== opt.id));
    },
    [onChange, selected]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  const handleDropdownToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  return (
    <div
      ref={containerRef as RefObject<HTMLDivElement>}
      className={styles.multiSelect}
      data-open={isOpen}
      onClick={() => setIsOpen(true)}
    >
      <div className={styles.tags}>
        <TagList selected={selected} onRemove={handleRemove} />

        <input
          className={styles.input}
          value={search}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
          placeholder={selected.length ? "" : placeholder}
        />
      </div>

      <ChevronToggle isOpen={isOpen} onToggle={handleDropdownToggle} />

      {isOpen && (
        <DropdownList
          filtered={filtered}
          selected={selected}
          onToggle={toggleOption}
        />
      )}
    </div>
  );
};

export default React.memo(MultiSelect);
