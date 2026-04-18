import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState();
  const [role, setRole] = useState();

  async function fetchRole() {
    // Add this to see the raw error details
    try {
     // const session = await fetchAuthSession();
     // console.log(session);
    } catch (error) {
      console.log("Error Name:", error.name);
      console.log("Error Message:", error.message);
      // Check if the underlying cause shows a region mismatch
    }
    if (groups && groups.includes("Admin")) {
      setRole("Admin");
    } else {
      setRole("user");
    }
  }
  async function fetchUser() {
    const user = await getCurrentUser();
    const userData = user.signInDetails.loginId.split("@")[0];
    setUsername(userData);
  }
  useEffect(() => {
    fetchUser();
    fetchRole();
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
