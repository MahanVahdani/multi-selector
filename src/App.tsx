import { useState } from "react";
import {
  MultiSelect,
  Option,
} from "./components/MultiSelect/MultiSelect.component";
import "./App.css";

function App() {
  const [selected, setSelected] = useState<Option[]>([]);

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
      <h1>Multi-Select</h1>
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

const allOptions: Option[] = [
  { id: "edu", label: "Education 🎓" },
  { id: "sci", label: "Science 🧪" },
  { id: "art", label: "Art 🤘" },
  { id: "mus", label: "Music 🎵" },
  { id: "tech", label: "Technology 💻" },
  { id: "sport", label: "Sports 🏀" },
  { id: "travel", label: "Travel ✈️" },
  { id: "food", label: "Food 🍔" },
  { id: "gaming", label: "Gaming 🎮" },
  { id: "health", label: "Health 🏥" },
  { id: "finance", label: "Finance 💰" },
  { id: "fashion", label: "Fashion 👗" },
  { id: "literature", label: "Literature 📚" },
  { id: "history", label: "History 📜" },
  { id: "nature", label: "Nature 🌳" },
  { id: "movies", label: "Movies 🎬" },
  { id: "photography", label: "Photography 📷" },
  { id: "fitness", label: "Fitness 🏋️‍♂️" },
  { id: "cooking", label: "Cooking 🍳" },
  { id: "programming", label: "Programming 👨‍💻" },
];
