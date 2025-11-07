import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  cartId?: string;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  checkSession: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
); // 👈 export agregado

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser debe usarse dentro de un UserProvider");
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const isLoggedIn = !!user;

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  const checkSession = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, login, logout, checkSession }}
    >
      {children}
    </UserContext.Provider>
  );
};
