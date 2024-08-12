// src/pages/AddHabit.tsx
import React, { useState } from "react";
import { useHabits } from "../contexts/HabitContext";
import { useNavigate } from "react-router-dom";

const AddHabit: React.FC = () => {
  const [habitName, setHabitName] = useState("");
  const [days, setDays] = useState<string[]>([]);
  const { addHabit } = useHabits();
  const navigate = useNavigate();

  const handleToggleDay = (day: string) => {
    if (days.includes(day)) {
      setDays(days.filter((d) => d !== day));
    } else {
      setDays([...days, day]);
    }
  };

  const handleSubmit = () => {
    if (habitName && days.length > 0) {
      const progress = days.reduce((acc, day) => {
        acc[day] = false;
        return acc;
      }, {} as Record<string, boolean>);

      addHabit({ name: habitName, days, progress });
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Add a New Habit</h1>
      <input
        type="text"
        placeholder="Habit name"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        className="input input-bordered w-full max-w-xs mb-4"
      />
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Select Days</h2>
        {["M", "T", "W", "Th", "F", "S", "Su"].map((day) => (
          <button
            key={day}
            className={`btn btn-sm mr-2 mb-2 ${
              days.includes(day) ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => handleToggleDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <button className="btn btn-success" onClick={handleSubmit}>
        Add Habit
      </button>
    </div>
  );
};

export default AddHabit;
