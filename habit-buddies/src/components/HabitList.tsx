import React, { useState, useEffect } from "react";
import { fetchHabitsFromGitHub, updateHabitsOnGitHub } from "../api/githubApi";
import { Button, Grid, Card, CardContent, Typography } from "@mui/material";

interface Habit {
  id: number;
  name: string;
  description: string;
  streak: number;
  progress: number[]; // Array to store daily progress, 1 for completed, 0 for not
}

interface User {
  id: string; // 'me' or 'friend'
  habits: Habit[];
}

const HabitList: React.FC<{ userId: string }> = ({ userId }) => {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHabitsFromGitHub();
      const userHabits =
        data.find((user: User) => user.id === userId)?.habits || [];
      setHabits(userHabits);
    };

    fetchData();
  }, [userId]);

  const logProgress = async (id: number) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === id) {
        const today = new Date().getDay();
        if (habit.progress[today] === 0) {
          habit.progress[today] = 1;
          habit.streak += 1;
        }
      }
      return habit;
    });

    setHabits(updatedHabits);

    // Update on GitHub
    const allUsersData = await fetchHabitsFromGitHub();
    const userIndex = allUsersData.findIndex(
      (user: User) => user.id === userId
    );
    allUsersData[userIndex].habits = updatedHabits;

    await updateHabitsOnGitHub(allUsersData);
  };

  return (
    <Grid container spacing={2}>
      {habits.map((habit) => (
        <Grid item xs={12} sm={6} key={habit.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{habit.name}</Typography>
              <Typography>{habit.description}</Typography>
              <Typography>Current Streak: {habit.streak}</Typography>
              <Button variant="contained" onClick={() => logProgress(habit.id)}>
                Complete Today
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default HabitList;
