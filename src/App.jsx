import { useEffect, lazy,  } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Auth/login";
import HomePage from "./pages/Home/home";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/HomePage" element={<HomePage />} />
    </Routes>
  );
}

export default App;