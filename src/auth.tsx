import * as React from "react";
import { CONFIG } from "./config";
import { User } from "./routes/admin/users";

export interface ResponseLogin {
  token: string;
  user: User;
}

export interface AuthContext {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<ResponseLogin>;
  logout: () => void;
  user: User | null;
  isLoading: boolean;
}
export const STORAGE_KEY = "token";
const INIT_AUTH_CONTEXT: AuthContext = {
  isAuthenticated: false,
  login: async () => {
    throw new Error("AuthProvider not yet initialized");
  },
  logout: () => {
    throw new Error("AuthProvider not yet initialized");
  },
  isLoading: false,
  user: null,
};
const AuthContext = React.createContext<AuthContext>(INIT_AUTH_CONTEXT);
const key = STORAGE_KEY;

async function getStoredUser(): Promise<User | null> {
  const token = localStorage.getItem(key);

  if (!token) return null;

  try {
    const response = await fetch(`${CONFIG.serverUrl}/auth/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      localStorage.removeItem(key);
      return null;
    }

    const user = await response.json();

    return user;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

function setStoredUser(token: string | null) {
  if (token) {
    localStorage.setItem(key, token);
  } else {
    localStorage.removeItem(key);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // const navigate = useNavigate();
  const isAuthenticated = !!user;

  React.useEffect(() => {
    async function initialize() {
      // Bắt đầu loading
      setIsLoading(true);
      const storedUser = await getStoredUser();
      if (storedUser) {
        setUser(storedUser);
      }
      console.log("storedUser", storedUser);

      setIsLoading(false);
      // Kết thúc loading
    }
    initialize();
  }, []);

  const login = React.useCallback(
    async (username: string, password: string) => {
      const response = await fetch(`${CONFIG.serverUrl}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data: ResponseLogin = await response.json();
      setStoredUser(data.token);
      setUser(data.user);
      return data; // Trả về để sử dụng trong component
    },
    []
  );

  const logout = React.useCallback(() => {
    setStoredUser(null);
    setUser(null);
    // navigate({ to: "/login" });
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
