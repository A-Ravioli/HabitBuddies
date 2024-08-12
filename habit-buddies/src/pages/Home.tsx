// src/pages/Home.tsx
import React from "react";
import { useHabits } from "../contexts/HabitContext";
import HabitItem from "../components/HabitItem";
import ProgressBar from "../components/ProgressBar";

const Home: React.FC = () => {
  const { habits, toggleDay } = useHabits();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Habits</h1>
      {habits.map((habit) => (
        <div key={habit.name}>
          <HabitItem
            habitName={habit.name}
            days={habit.days}
            progress={habit.progress}
            toggleDay={(day) => toggleDay(habit.name, day)}
          />
          <ProgressBar progress={calculateProgress(habit.progress)} />
        </div>
      ))}
    </div>
  );
};

// Utility function to calculate progress percentage
const calculateProgress = (progress: Record<string, boolean>): number => {
  const totalDays = Object.keys(progress).length;
  const completedDays = Object.values(progress).filter((done) => done).length;
  return (completedDays / totalDays) * 100;
};

export default Home;
