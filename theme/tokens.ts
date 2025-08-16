export type ColorTokens = {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  ring: string;
  success: string;
  warning: string;
  error: string;
  heroOverlay: string;
};

export type TypographyTokens = {
  fontFamilySans: string;
  fontFamilyMono: string;
  baseSize: string;
  lineHeight: string;
  weightRegular: number;
  weightMedium: number;
  weightBold: number;
};

export type RadiusTokens = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
};

export type SpacingScale = {
  /** 0px */ 0: string;
  /** 4px */ 1: string;
  /** 8px */ 2: string;
  /** 12px */ 3: string;
  /** 16px */ 4: string;
  /** 20px */ 5: string;
  /** 24px */ 6: string;
  /** 32px */ 8: string;
  /** 40px */ 10: string;
  /** 48px */ 12: string;
  /** 64px */ 16: string;
};

export type BreakpointTokens = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

export type ThemeTokens = {
  colors: ColorTokens;
  typography: TypographyTokens;
  radius: RadiusTokens;
  spacing: SpacingScale;
  breakpoints: BreakpointTokens;
};

export const tokens: ThemeTokens = {
  colors: {
    background: "#ffffff",
    foreground: "#0b0b0c",
    primary: "#111827",
    primaryForeground: "#ffffff",
    secondary: "#6b7280",
    secondaryForeground: "#ffffff",
    accent: "#FF2600",
    accentForeground: "#ffffff",
    muted: "#f3f4f6",
    mutedForeground: "#4b5563",
    border: "#e5e7eb",
    ring: "#FF2600",
    success: "#16a34a",
    warning: "#f59e0b",
    error: "#ef4444",
    heroOverlay: "rgba(0,0,0,0.85)",
  },
  typography: {
    fontFamilySans: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\"",
    fontFamilyMono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
    baseSize: "16px",
    lineHeight: "1.6",
    weightRegular: 400,
    weightMedium: 500,
    weightBold: 700,
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },
  spacing: {
    0: "0px",
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
    10: "40px",
    12: "48px",
    16: "64px",
  },
  breakpoints: {
    xs: "320px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
};

export type MediaType = "movie" | "tv";
