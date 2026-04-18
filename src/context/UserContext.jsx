import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState();

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      const userData = user.signInDetails.loginId.split("@")[0];
      setUsername(userData);
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
