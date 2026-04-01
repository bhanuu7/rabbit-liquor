import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async () => {
  const { data } = await axios.get(`http://localhost:3000/products`);
  // console.log("env", `${import.meta.env.VITE_BASE_URL}/api/products`); // TO DO
  return data;
};

export const getProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};
