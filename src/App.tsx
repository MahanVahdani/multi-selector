import { useState } from "react";
import {
  MultiSelect,
  Option,
} from "./components/MultiSelect/MultiSelect.component";
import "./App.css";

function App() {
  const [selected, setSelected] = useState<Option[]>([]);
  const allOptions: Option[] = [
    { id: "edu", label: "Education 🎓" },
    { id: "sci", label: "Yeeeah, science! 🧪" },
    { id: "art", label: "Art 🤘" },
  ];

  return (
    <div
      style={{
        padding: 40,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Lobox Multi-Select</h1>
      <MultiSelect
        options={allOptions}
        selected={selected}
        onChange={setSelected}
        placeholder="Pick your topics…"
      />
    </div>
  );
}

export default App;
