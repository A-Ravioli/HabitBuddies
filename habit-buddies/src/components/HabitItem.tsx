// src/components/HabitItem.tsx
import React from "react";

interface HabitItemProps {
  habitName: string;
  days: string[]; // Days of the week to track this habit (e.g., ["M", "W", "F"])
  progress: Record<string, boolean>; // Track progress (e.g., { M: true, W: false, F: true })
  toggleDay: (day: string) => void; // Function to toggle the completion status of a day
}

const HabitItem: React.FC<HabitItemProps> = ({
  habitName,
  days,
  progress,
  toggleDay,
}) => {
  return (
    <div className="flex flex-col p-4 mb-2 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-bold mb-2">{habitName}</h3>
      <div className="flex space-x-2">
        {days.map((day) => (
          <button
            key={day}
            className={`btn btn-sm ${
              progress[day] ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => toggleDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HabitItem;
