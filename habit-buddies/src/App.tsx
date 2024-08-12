// src/App.tsx
// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HabitProvider } from "./contexts/HabitContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddHabit from "./pages/AddHabit";

function App() {
  return (
    <HabitProvider>
      <Router>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/home" Component={Home} />
          <Route path="/add-habit" Component={AddHabit} />
        </Routes>
      </Router>
    </HabitProvider>
  );
}

export default App;
