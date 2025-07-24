"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

interface AppState {
  isLoading: boolean;
  error: string | null;
  notifications: Notification[];
}

interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
}

type AppAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "REMOVE_NOTIFICATION"; payload: string }
  | { type: "CLEAR_NOTIFICATIONS" };

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  isLoading: false,
  error: null,
  notifications: [],
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload
        ),
      };
    case "CLEAR_NOTIFICATIONS":
      return { ...state, notifications: [] };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: "SET_ERROR", payload: error });
  };

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    dispatch({ type: "ADD_NOTIFICATION", payload: { ...notification, id } });
  };

  const removeNotification = (id: string) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
  };

  const clearNotifications = () => {
    dispatch({ type: "CLEAR_NOTIFICATIONS" });
  };

  const value: AppContextType = {
    state,
    dispatch,
    setLoading,
    setError,
    addNotification,
    removeNotification,
    clearNotifications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
