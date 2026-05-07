import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home"; // você pode transformar seu App atual em Home
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

let user = null;

try {
  const storedUser = localStorage.getItem("user");

  if (storedUser && storedUser !== "undefined") {
    user = JSON.parse(storedUser);
  }
} catch (error) {
  console.error("Erro ao ler user do localStorage:", error);
  localStorage.removeItem("user");
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/dashboard" element={user?.tipo === "cliente" ? <Dashboard /> : <Login />}/>
      <Route path="/admin" element={user?.tipo === "admin" ? <Admin /> : <Login />}/>
    </Routes>
  );
}
