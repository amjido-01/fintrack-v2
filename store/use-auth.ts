import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import api from "@/app/api/axiosConfig";

interface Expense {
  id: string;
  expenseName: string;
  amount: number;
  date: string;
  category: string;
  note: string;
  isDeleted: boolean;
  workspaceId: string;
}

interface Income {
  id: string;
  incomeSource: string;
  amount: number;
  date: string;
  category: string;
  description: string;
  workspaceId: string;
  isDeleted: boolean
}

interface Workspace {
  id: string;
  workspaceName: string;
  currency: string;
  description: string;
  createdById: string;
  isDeleted: boolean;
  deletedAt: Date | null;
  deletedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt: Date;
  expenses: Expense[]; // Replace 'any' with specific Expense interface if available
  income: Income[];   // Replace 'any' with specific Income interface if available
}

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
  expenses: Expense[];
  income: Income[]
  workspaces: Workspace[]
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  isLoggedIn: () => boolean;
  login: (email: string, password: string) => Promise<User | void>;
  register: (email: string, password: string, name: string, userName: string) => Promise<void>
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  refreshToken: () => Promise<void>;
  setUser: (user: User | null) => void;
}


export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      user: null,
      accessToken: null,
      loading: false,

      isLoggedIn: () => {
        return !!get().accessToken;
      },

      setUser: (user) => set({ user }),

      register: async (name: string, email: string, password: string, userName: string) => {
        try {
          const response = await api.post('/auth/register', { name, userName, email, password })
          console.log(response, "from register")
          const { user, accessToken, refreshToken } = response.data.responseBody
          set({ user, accessToken, refreshToken })
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

          // Note: We don't set tokens here as they're typically not provided upon registration
        } catch (error) {
          console.error('Registration failed:', error)
          throw error
        }
      },


      login: async (email: string, password: string) => {
        set({ loading: true });
        try {
          const response = await api.post("/auth/login", { email, password });
          const { accessToken, refreshToken, responseBody } = response.data;

          set({ accessToken, user: responseBody});
          api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          
          return responseBody;
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      checkAuth: async () => {
        const accessToken = get().accessToken;

        // If there's no access token, assume the user is not logged in
        if (!accessToken) {
          console.warn("Access token not found. User not logged in.");
          set({ user: null, loading: false });
          return false;
        }
        try {
          const response = await api.get("/user/profile");

          const { user } = response.data;
          set({user});
          return true
        } catch (error) {
          console.error("Error fetching user data:", error);
          set({ user: null, loading: false });
          return false
        }
      },

      refreshToken: async () => {
        try {
          const response = await api.post("/refresh-token");
          const { accessToken } = response.data;
          console.log(accessToken, "refreshtoken")

          set({ accessToken });
          api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        } catch (error) {
          console.error("Error refreshing token:", error);
          set({ user: null, accessToken: null });
        }
      },

      logout: async () => {
        console.log("log out...")
        try {
          await api.post("/auth/logout");
        } catch (error) {
          console.warn("Logout failed, but clearing user data anyway:", error);
        }
        set({ user: null, accessToken: null });
        delete api.defaults.headers.common["Authorization"];
      }
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);