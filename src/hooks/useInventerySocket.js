import { useEffect } from "react";
import { socket } from "@/utils/socket";
import { useQueryClient } from "@tanstack/react-query";

export const useInventorySocket = () => {
  const queryClient = useQueryClient();

  console.log("socket instance in hook", socket);
  useEffect(() => {
    // 🔥 Ensure socket is connected
    if (!socket.connected) {
     // socket.connect();
    }

    // 🔥 DEBUG: Listen to ALL events
    socket.onAny((event, ...args) => {
      console.log("🔥 SOCKET EVENT:", event, args);
    });

    const handleUpdate = (data) => {
      const { productId, stock_count } = data;
      // 🧠 Safe cache update
      queryClient.setQueryData(["products"], (old = []) => {
        if (!old) return [];
        return old.map((p) => (p.id === productId ? { ...p, stock_count } : p));
      });
    };

    // ✅ Listen
    socket.on("inventory:update", (event) => {
      handleUpdate(event);
    });

    // 🧹 Cleanup (VERY IMPORTANT)
    return () => {
      socket.off("inventory:update", handleUpdate);
    };
  }, [queryClient]);
};
