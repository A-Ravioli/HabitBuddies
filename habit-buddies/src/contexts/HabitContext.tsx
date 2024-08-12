// src/contexts/HabitContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import habitService from "../services/habitService";

interface Habit {
  name: string;
  days: string[];
  progress: Record<string, boolean>;
}

interface HabitContextProps {
  habits: Habit[];
  addHabit: (habit: Habit) => void;
  toggleDay: (habitName: string, day: string) => void;
}

const HabitContext = createContext<HabitContextProps | undefined>(undefined);

export const HabitProvider: React.FC = ({ children }) => {
  const [habits, setHabits] = useLocalStorage<Habit[]>("habits", []);

  useEffect(() => {
    // Fetch initial habits from GitHub (if necessary)
    habitService.fetchHabits().then((remoteHabits) => {
      if (remoteHabits) {
        setHabits(remoteHabits);
      }
    });
  }, [setHabits]);

  const addHabit = (habit: Habit) => {
    const newHabits = [...habits, habit];
    setHabits(newHabits);
    habitService.updateHabits(newHabits);
  };

  const toggleDay = (habitName: string, day: string) => {
    const updatedHabits = habits.map((habit) =>
      habit.name === habitName
        ? {
            ...habit,
            progress: {
              ...habit.progress,
              [day]: !habit.progress[day],
            },
          }
        : habit
    );
    setHabits(updatedHabits);
    habitService.updateHabits(updatedHabits);
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, toggleDay }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
};
