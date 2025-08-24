import {
  useState,
  useRef,
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

  const containerRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  const filtered: Option[] = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggleOption = (opt: Option): void => {
    const alreadySelected = selected.some((s) => s.id === opt.id);

    if (alreadySelected) {
      onChange(selected.filter((s) => s.id !== opt.id));
    } else {
      onChange([...selected, opt]);
    }

    setSearch("");
    setIsOpen(true);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
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
    filtered,
    toggleOption,
    onKeyDown,
  };
};

export default useMuiSelect;
