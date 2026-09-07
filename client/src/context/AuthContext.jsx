import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const userInfo = localStorage.getItem("userInfo");
         console.log(userInfo);
    if (userInfo && userInfo !== "undefined") {

      try {
        setUser(JSON.parse(userInfo));
      } catch (error) {
        console.log("Invalid userInfo:", error);
        localStorage.removeItem("userInfo");
      }

    }

  }, []);

 const login = (data) => {
    console.log("AUTH LOGIN DATA:", data);

    // Backend se data flat aa raha hai, isliye token alag karein aur baaki sab user data banega
    const { token, ...userData } = data;

    setUser(userData);
    
    localStorage.setItem(
      "userInfo",
      JSON.stringify(userData)
    );

    if (token) {
      localStorage.setItem(
        "token",
        token
      );
    }
  };

  const logout = () => {

    setUser(null);

    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        role: user?.role || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);