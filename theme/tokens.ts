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
    background: "#0b0b0c",
    foreground: "#f4f4f5",
    primary: "#6ee7b7",
    primaryForeground: "#06281d",
    secondary: "#94a3b8",
    secondaryForeground: "#0b0b0c",
    accent: "#60a5fa",
    accentForeground: "#051225",
    muted: "#374151",
    mutedForeground: "#cbd5e1",
    border: "#1f2937",
    ring: "#60a5fa",
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
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

