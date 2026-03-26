import "./App.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  );
}

export default App;
