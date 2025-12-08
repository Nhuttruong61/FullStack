import React, { createContext, useContext, useEffect, useState } from "react";
import { useSettings } from "./SettingsContext";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const { settings } = useSettings();
  const [theme, setTheme] = useState({
    primaryColor: "#007bff",
    secondaryColor: "#6c757d", 
    accentColor: "#28a745",
    successColor: "#28a745",
    dangerColor: "#dc3545",
    warningColor: "#ffc107",
    infoColor: "#17a2b8",
    backgroundColor: "#ffffff",
    backgroundSecondaryColor: "#f8f9fa",
    surfaceColor: "#ffffff",
    cardBackgroundColor: "#ffffff",
    textColor: "#212529",
    textSecondaryColor: "#6c757d",
    textLightColor: "#868e96",
    borderColor: "#dee2e6",
    borderLightColor: "#e9ecef",
    hoverColor: "#0056b3",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    overlayColor: "rgba(0, 0, 0, 0.5)",
    linkColor: "#007bff",
    linkHoverColor: "#0056b3",
    buttonPrimaryBg: "#007bff",
    buttonPrimaryText: "#ffffff",
    buttonSecondaryBg: "#6c757d",
    buttonSecondaryText: "#ffffff",
    inputBorderColor: "#ced4da",
    inputBackgroundColor: "#ffffff",
    inputTextColor: "#212529",
    footerBackgroundColor: "#1a1a1a",
    footerTextColor: "#ffffff",
    borderRadius: 8,
    fontFamily: "'Roboto', sans-serif",
    fontSize: 16
  });

  // Update theme when settings change
  useEffect(() => {
    console.log('ThemeContext - Settings changed:', settings);
    if (settings?.theme) {
      console.log('ThemeContext - Applying theme:', settings.theme);
      setTheme(prevTheme => ({
        ...prevTheme,
        ...settings.theme
      }));
    } else {
      console.log('ThemeContext - No theme found in settings');
    }
  }, [settings]);

  // Apply theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--accent-color', theme.accentColor);
    root.style.setProperty('--success-color', theme.successColor || theme.accentColor);
    root.style.setProperty('--danger-color', theme.dangerColor || '#dc3545');
    root.style.setProperty('--warning-color', theme.warningColor || '#ffc107');
    root.style.setProperty('--info-color', theme.infoColor || '#17a2b8');
    root.style.setProperty('--background-color', theme.backgroundColor);
    root.style.setProperty('--background-secondary-color', theme.backgroundSecondaryColor || '#f8f9fa');
    root.style.setProperty('--surface-color', theme.surfaceColor || theme.backgroundColor);
    root.style.setProperty('--card-background-color', theme.cardBackgroundColor || theme.backgroundColor);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--text-secondary-color', theme.textSecondaryColor);
    root.style.setProperty('--text-light-color', theme.textLightColor || theme.textSecondaryColor);
    root.style.setProperty('--border-color', theme.borderColor);
    root.style.setProperty('--border-light-color', theme.borderLightColor || theme.borderColor);
    root.style.setProperty('--hover-color', theme.hoverColor);
    root.style.setProperty('--shadow-color', theme.shadowColor || 'rgba(0, 0, 0, 0.1)');
    root.style.setProperty('--overlay-color', theme.overlayColor || 'rgba(0, 0, 0, 0.5)');
    root.style.setProperty('--link-color', theme.linkColor || theme.primaryColor);
    root.style.setProperty('--link-hover-color', theme.linkHoverColor || theme.hoverColor);
    root.style.setProperty('--button-primary-bg', theme.buttonPrimaryBg || theme.primaryColor);
    root.style.setProperty('--button-primary-text', theme.buttonPrimaryText || '#ffffff');
    root.style.setProperty('--button-secondary-bg', theme.buttonSecondaryBg || theme.secondaryColor);
    root.style.setProperty('--button-secondary-text', theme.buttonSecondaryText || '#ffffff');
    root.style.setProperty('--input-border-color', theme.inputBorderColor || theme.borderColor);
    root.style.setProperty('--input-background-color', theme.inputBackgroundColor || theme.backgroundColor);
    root.style.setProperty('--input-text-color', theme.inputTextColor || theme.textColor);
    root.style.setProperty('--footer-background-color', theme.footerBackgroundColor || '#1a1a1a');
    root.style.setProperty('--footer-text-color', theme.footerTextColor || '#ffffff');
    root.style.setProperty('--header-bg', theme.headerBackgroundColor || '#1a1a1a');
    root.style.setProperty('--header-text', theme.headerTextColor || '#ffffff');
    root.style.setProperty('--header-hover', theme.headerHoverColor || '#ff6b6b');
    root.style.setProperty('--header-font-family', theme.headerFontFamily || theme.fontFamily || "'Roboto', sans-serif");
    root.style.setProperty('--header-font-size', `${theme.headerFontSize || theme.fontSize || 16}px`);
    root.style.setProperty('--border-radius', `${theme.borderRadius || 8}px`);
    root.style.setProperty('--font-family', theme.fontFamily || "'Roboto', sans-serif");
    root.style.setProperty('--font-size', `${theme.fontSize || 16}px`);
  }, [theme]);

  const value = {
    theme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;