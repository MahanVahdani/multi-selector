# Multi Selector

A lightweight, dependency-free multi-select dropdown component for React, built with TypeScript. Type to search, click to select multiple options, and remove selections as tags — no external UI library required.

## Features

- 🏷️ Selected options render as removable tags inside the input
- 🔍 Type-ahead search/filter through available options
- ⌨️ Keyboard support (via `onKeyDown` handling)
- 🖱️ Closes when clicking outside (`useClickOutside` hook)
- ⚛️ Fully typed with TypeScript, built with `React.memo` for performance
- 🎨 Styled with CSS Modules (SCSS) — easy to theme

## Tech Stack

- React (Create React App)
- TypeScript
- SCSS Modules

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

```tsx
import MultiSelect, { Option } from "./components/MultiSelect/MultiSelect.component";
import { useState } from "react";

const options: Option[] = [
  { id: "1", label: "Apple" },
  { id: "2", label: "Banana" },
  { id: "3", label: "Cherry" },
];

function Example() {
  const [selected, setSelected] = useState<Option[]>([]);

  return (
    <MultiSelect
      options={options}
      selected={selected}
      onChange={setSelected}
      placeholder="Select fruits…"
    />
  );
}
```

### Props

| Prop          | Type                        | Description                              |
| ------------- | --------------------------- | ----------------------------------------- |
| `options`     | `Option[]`                  | Full list of selectable options           |
| `selected`    | `Option[]`                  | Currently selected options (controlled)   |
| `onChange`    | `(items: Option[]) => void` | Called whenever the selection changes     |
| `placeholder` | `string` (optional)         | Placeholder text when nothing is selected |

Where `Option` is:

```ts
interface Option {
  id: string;
  label: string;
}
```

## Available Scripts

- `npm start` — runs the app in development mode
- `npm test` — runs the test runner
- `npm run build` — builds the app for production

## License

Not currently licensed — add a LICENSE file if you intend others to reuse this.
