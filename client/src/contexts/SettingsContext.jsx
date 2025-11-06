import React, { createContext, useContext, useEffect, useState } from "react";
import { getPublicSettings } from "../api/settings";

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await getPublicSettings();
      if (response.success) {
        setSettings(response.data);
        setError(null);
      } else {
        setError("Failed to load settings");
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refetchSettings = () => {
    fetchSettings();
  };

  const value = {
    settings,
    loading,
    error,
    refetchSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
