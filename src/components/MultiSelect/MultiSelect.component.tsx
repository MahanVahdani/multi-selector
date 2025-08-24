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
