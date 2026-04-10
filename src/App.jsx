import { useState } from "react";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import Inventory from "./pages/Inventory";
import { StoreProvider } from "./context/StoreContext";
import { CartProvider } from "./context/CartContext";
import { TooltipProvider } from "./components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./AppLayout";
import CartPage from "./pages/CartPage";
import AgeVerification from "./components/AgeVerification";
import SpinnerDemo from "./pages/SpinnerDemo";

const queryClient = new QueryClient();

function App() {
  const [ageVerified, setAgeVerified] = useState(
    () => sessionStorage.getItem("ageVerified") === "true"
  );

  const handleAgeConfirm = () => {
    sessionStorage.setItem("ageVerified", "true");
    setAgeVerified(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {!ageVerified && <AgeVerification onConfirm={handleAgeConfirm} />}
      <BrowserRouter>
        <TooltipProvider>
          <StoreProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/spinner-test" element={<SpinnerDemo />} />
                <Route element={<AppLayout />}>
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/cart" element={<CartPage />} />
                </Route>
              </Routes>
            </CartProvider>
          </StoreProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
