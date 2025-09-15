import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Dashboard from "./pages/Dashboard"; // Direct route
import AdminLoginForm from "./AdminLoginForm";
import AdminDashboard from "./AdminDashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* direct access */}
        <Route path="/admin-login" element={<AdminLoginForm />} />
        <Route path="/admin-dashboard"element={<AdminDashboard />}/>
      
      </Routes>
    </Router>
  );
}

export default App;