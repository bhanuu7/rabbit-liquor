import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const reserveRequest = async (productId) => {
  const { data } = await axios.post("http://localhost:3000/reserve", {
    // TO DO
    productId,
  });
  return data;
};

export const reserveProduct = () => {
  return useMutation({
    mutationKey: ["reserveProduct"],
    mutationFn: reserveRequest,
    onError: (err) => {
      console.error("Reserve failed", err);
    },
  });
};
