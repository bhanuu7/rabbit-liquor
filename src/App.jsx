import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Inventory from "./pages/Inventory";
import { StoreProvider } from "./context/StoreContext";
import { TooltipProvider } from "./components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./AppLayout";
import CartPage from "./pages/CartPage";
import { Amplify } from "aws-amplify";
import OrdersPage from "./pages/OrdersPage";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
      region: import.meta.env.VITE_COGNITO_REGION,
    },
  },
});

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
                <Route path="/cart" element={<CartPage />} />
                <Route path="/orders" element={<OrdersPage />} />
              </Route>
            </Routes>
          </StoreProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
