import {
  useState,
  useRef,
  useCallback,
  useMemo,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  RefObject,
} from "react";
import { useClickOutside } from "./useClickOutside.hook";
import { Option } from "./MultiSelect.component";

interface UseMuiSelectProps {
  options: Option[];
  selected: Option[];
  onChange: (items: Option[]) => void;
}

export interface UseMuiSelectReturn {
  containerRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filtered: Option[];
  toggleOption: (opt: Option) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const useMuiSelect = ({
  options,
  selected,
  onChange,
}: UseMuiSelectProps): UseMuiSelectReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  // ref for click-outside detection
  const containerRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  // memoize filter to avoid recomputing on every render
  const filtered = useMemo<Option[]>(
    () =>
      options.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase())
      ),
    [options, search]
  );

  // stable callback to toggle select / deselect
  const toggleOption = useCallback(
    (opt: Option) => {
      const already = selected.some((s) => s.id === opt.id);
      if (already) {
        onChange(selected.filter((s) => s.id !== opt.id));
      } else {
        onChange([...selected, opt]);
      }
      // clear search and re-open dropdown
      setSearch("");
      setIsOpen(true);
    },
    [onChange, selected]
  );

  // stable keyboard handler for Enter key
  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && search.trim() !== "") {
        e.preventDefault();
        setIsOpen(true);
      }
    },
    [search]
  );

  return {
    containerRef,
    isOpen,
    setIsOpen,
    search,
    setSearch,
    filtered,
    toggleOption,
    onKeyDown,
  };
};

export default useMuiSelect;
