import React from "react";

function CalorieList({ entries }) {
  return (
    <ul>
      {entries.map((entry) => (
        <li
          key={entry.id}
        >{`${entry.food}, ${entry.calories} calories, Date: ${entry.date}, Time: ${entry.time}`}</li>
      ))}
    </ul>
  );
}

export default CalorieList;
