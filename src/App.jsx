import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Inventory from "./pages/Inventory";
import { StoreProvider } from "./context/StoreContext";
import { TooltipProvider } from "./components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./AppLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <StoreProvider>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route element={<AppLayout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/inventory" element={<Inventory />} />
              </Route>
            </Routes>
          </StoreProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
