import React, { useState, useEffect } from "react";

function CalorieForm({ onAddEntry }) {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [time, setTime] = useState(new Date().toTimeString().substring(0, 5));

  // useEffect hook to fetch calories whenever the food state changes and is not empty.
  useEffect(() => {
    if (food.trim() !== "") {
      fetchCalories(food);
    }
  }, [food]);

  const fetchCalories = async (foodItem) => {
    try {
      const apiKey = "pNe0I2Bei4Q6gVv/l2ZqTQ==AISNHCye5e8fsuJA";
      const response = await fetch(
        `https://api.calorieninjas.com/v1/nutrition?query=${foodItem}`,
        {
          headers: { "X-Api-Key": apiKey },
        }
      );
      const data = await response.json();
      if (data.items.length > 0) {
        // Assuming we take the first item's calorie count
        const calories = data.items[0].calories;
        setCalories(calories.toString()); // Ensure the calories are set as a string to match the input's expected type
      } else {
        setCalories(""); // Clear calories if no data is found
      }
    } catch (error) {
      console.error("Failed to fetch calorie data:", error);
      setCalories("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEntry({ food, calories, date, time });
    // Reset form
    setFood("");
    setCalories("");
    setDate(new Date().toISOString().substring(0, 10));
    setTime(new Date().toTimeString().substring(0, 5));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={food}
        onChange={(e) => setFood(e.target.value)}
        placeholder="Food Item"
        required
      />
      <input
        type="number"
        value={calories}
        readOnly
        placeholder="Calories"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <button type="submit">Add Entry</button>
    </form>
  );
}

export default CalorieForm;
