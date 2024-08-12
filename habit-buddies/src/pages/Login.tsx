// src/pages/Login.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (user: string) => {
    localStorage.setItem("currentUser", user);
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Select User</h1>
      <button
        className="btn btn-primary mb-4"
        onClick={() => handleLogin("user1")}
      >
        Login as User 1
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => handleLogin("user2")}
      >
        Login as User 2
      </button>
    </div>
  );
};

export default Login;
