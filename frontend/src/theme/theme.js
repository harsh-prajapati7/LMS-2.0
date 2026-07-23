import { createTheme } from "@mui/material/styles";

export const getAppTheme = (mode = "dark") => {
  const isDark = mode !== "light"; // Default to sleek dark mode

  return createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
      primary: {
        main: "#6366F1", // Electric Violet / Indigo
        light: "#818CF8",
        dark: "#4F46E5",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#06B6D4", // Neon Cyan
        light: "#38BDF8",
        dark: "#0891B2",
        contrastText: "#FFFFFF",
      },
      success: {
        main: "#10B981", // Emerald Neon
        light: "#34D399",
        dark: "#059669",
        contrastText: "#FFFFFF",
      },
      warning: {
        main: "#F59E0B", // Vibrant Gold
        light: "#FBBF24",
        dark: "#D97706",
      },
      error: {
        main: "#F43F5E", // Rose Red
        light: "#FB7185",
        dark: "#E11D48",
      },
      background: {
        default: isDark ? "#090D16" : "#F8FAFC",
        paper: isDark ? "#111827" : "#FFFFFF",
        subtle: isDark ? "#1F2937" : "#F1F5F9",
      },
      text: {
        primary: isDark ? "#F9FAFB" : "#0F172A",
        secondary: isDark ? "#9CA3AF" : "#475569",
        disabled: isDark ? "#6B7280" : "#94A3B8",
      },
      divider: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
    },

    typography: {
      fontFamily: [
        "Inter",
        "Poppins",
        "-apple-system",
        "BlinkMacSystemFont",
        "sans-serif",
      ].join(","),
      h1: { fontWeight: 800, letterSpacing: "-0.03em" },
      h2: { fontWeight: 800, letterSpacing: "-0.025em" },
      h3: { fontWeight: 700, letterSpacing: "-0.02em" },
      h4: { fontWeight: 700, letterSpacing: "-0.015em" },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
      subtitle1: { fontWeight: 600 },
      subtitle2: { fontWeight: 600, fontSize: "0.875rem" },
      button: {
        textTransform: "none",
        fontWeight: 700,
        letterSpacing: "0.01em",
      },
    },

    shape: {
      borderRadius: 16,
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? "#090D16" : "#F8FAFC",
            backgroundImage: isDark
              ? "radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.12) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(16, 185, 129, 0.1) 0px, transparent 50%)"
              : "none",
            backgroundAttachment: "fixed",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: "9px 20px",
            boxShadow: "none",
            fontWeight: 700,
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 8px 20px -4px rgba(99, 102, 241, 0.4)",
            },
          },
          containedPrimary: {
            background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
          },
          containedSuccess: {
            background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: 20,
            border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}`,
            boxShadow: isDark
              ? "0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05)"
              : "0 10px 30px -10px rgba(0, 0, 0, 0.05)",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}`,
            boxShadow: isDark
              ? "0 10px 30px -10px rgba(0, 0, 0, 0.5)"
              : "0 10px 30px -10px rgba(0, 0, 0, 0.05)",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            fontWeight: 700,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 700,
            fontSize: "0.8125rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            backgroundColor: isDark ? "#111827" : "#F1F5F9",
            color: isDark ? "#9CA3AF" : "#64748B",
            borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "#E2E8F0"}`,
          },
          body: {
            borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.05)" : "#F1F5F9"}`,
          },
        },
      },
    },
  });
};

const defaultTheme = getAppTheme("dark");
export default defaultTheme;