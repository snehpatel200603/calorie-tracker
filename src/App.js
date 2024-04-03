import React, { useState } from "react";
import "./App.css";
import CalorieForm from "./components/CalorieForm";
import CalorieList from "./components/CalorieList";

function App() {
  const [entries, setEntries] = useState([]);

  const addEntry = (entry) => {
    setEntries([...entries, { ...entry, id: Date.now() }]);
  };

  return (
    <div className="App">
      <header>
        <h1>Calorie Tracker</h1>
      </header>
      <CalorieForm onAddEntry={addEntry} />
      <CalorieList entries={entries} />
    </div>
  );
}

export default App;
