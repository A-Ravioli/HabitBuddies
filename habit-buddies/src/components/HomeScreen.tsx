import React from "react";
import HabitList from "./HabitList";
import { Container, Typography } from "@mui/material";

const HomeScreen: React.FC = () => {
  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Habit Tracker
      </Typography>

      <Typography variant="h4">Your Habits</Typography>
      <HabitList userId="me" />

      <Typography variant="h4" style={{ marginTop: "20px" }}>
        Friend's Habits
      </Typography>
      <HabitList userId="friend" />
    </Container>
  );
};

export default HomeScreen;
