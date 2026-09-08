import { createContext,useContext,useEffect,useState,} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo && userInfo !== "undefined") {
      try {
        const parsedUser = JSON.parse(userInfo);

        // Normal user object
        setUser(parsedUser.user || parsedUser);
      } catch (error) {
        console.log("Invalid userInfo:", error);

        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (data) => {
    console.log("AUTH LOGIN DATA:", data);

    // data.user ko state me save karo
    setUser(data.user);

    // Sirf actual user object save karo
    localStorage.setItem(
      "userInfo",
      JSON.stringify(data.user)
    );

    localStorage.setItem("token", data.token);
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