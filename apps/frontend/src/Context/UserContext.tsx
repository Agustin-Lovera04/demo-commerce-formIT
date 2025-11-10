import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  cartId?: string;
  name?: string;
  role?: string;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: any) => void;
  logout: () => void;
  checkSession: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("Internal server error.");
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  
  const stored = localStorage.getItem("user");
  const parsed = stored ? JSON.parse(stored) : null;
  const formattedUser =
    parsed && parsed.data
      ? {
          id: parsed.data._id,
          email: parsed.data.email,
          cartId: parsed.data.cartId,
          name: parsed.data.name,
          role: parsed.data.role,
        }
      : null;

  const [user, setUser] = useState<User | null>(formattedUser);
  const isLoggedIn = !!user;

  const login = (userData: any) => {
    
    const normalized =
      userData.data
        ? {
            id: userData.data._id,
            email: userData.data.email,
            cartId: userData.data.cartId,
            name: userData.data.name,
            role: userData.data.role,
          }
        : userData;

    setUser(normalized);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const checkSession = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/current`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        login(data); 
      } else {
        logout();
      }
    } catch {
      logout();
    }
  };

  useEffect(() => {
    
    if (!user) checkSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout, checkSession }}>
      {children}
    </UserContext.Provider>
  );
};
