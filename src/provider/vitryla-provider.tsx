import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type HTMLAttributes
} from "react";
import type { Theme, TokenOverrides } from "../tokens/types";
import { PortalContainerContext } from "./portal-container";
import { tokensToStyle } from "./tokens-to-style";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface VitrylaProviderProps extends HTMLAttributes<HTMLDivElement> {
  theme?: Theme;
  defaultTheme?: Theme;
  onThemeChange?: (theme: Theme) => void;
  tokens?: TokenOverrides;
}

export function VitrylaProvider({
  theme: themeProp,
  defaultTheme = "system",
  onThemeChange,
  tokens,
  style,
  ...props
}: VitrylaProviderProps) {
  const [uncontrolledTheme, setUncontrolledTheme] = useState<Theme>(defaultTheme);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const theme = themeProp ?? uncontrolledTheme;

  const setTheme = useCallback(
    (next: Theme) => {
      if (themeProp === undefined) setUncontrolledTheme(next);
      onThemeChange?.(next);
    },
    [themeProp, onThemeChange]
  );

  const contextValue = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
  const tokenStyle = useMemo(() => tokensToStyle(tokens), [tokens]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <PortalContainerContext.Provider value={container}>
        <div
          ref={setContainer}
          data-vitryla-theme={theme}
          style={{ ...tokenStyle, ...style }}
          {...props}
        />
      </PortalContainerContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside <VitrylaProvider>");
  }
  return context;
}
