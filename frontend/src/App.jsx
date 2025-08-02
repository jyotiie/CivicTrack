import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserHomePage from "./pages/UserHomePage";
import IssueDetailPage from "./pages/IssueDetailPage";
import LoginPage from "./pages/LoginPage";        // ✅ Login Page
import RegisterPage from "./pages/RegisterPage";  // ✅ Register Page
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserHomePage />} />
        <Route path="/issue/:id" element={<IssueDetailPage />} />
        <Route path="/login" element={<LoginPage />} />       {/* ✅ Login Route */}
        <Route path="/register" element={<RegisterPage />} /> {/* ✅ Register Route */}
      </Routes>
    </Router>
  );
}

export default App;
