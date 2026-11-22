import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../components/button";
import { VitrylaProvider, useTheme } from "./vitryla-provider";

const colorTokens = [
  "background",
  "foreground",
  "muted",
  "muted-foreground",
  "border",
  "primary",
  "primary-foreground",
  "danger",
  "danger-foreground",
  "focus-ring"
];

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      {(["system", "light", "dark"] as const).map(value => (
        <Button key={value} aria-pressed={theme === value} onClick={() => setTheme(value)}>
          {value}
        </Button>
      ))}
    </div>
  );
}

function Swatches() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
      {colorTokens.map(name => (
        <div key={name}>
          <div
            style={{
              height: 48,
              borderRadius: "var(--vitryla-radius-md)",
              border: "1px solid var(--vitryla-color-border)",
              background: `var(--vitryla-color-${name})`
            }}
          />
          <code style={{ fontSize: 12 }}>{name}</code>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: "Provider/VitrylaProvider",
  component: VitrylaProvider
} satisfies Meta<typeof VitrylaProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <VitrylaProvider style={{ padding: 16 }}>
      <ThemeSwitcher />
      <Swatches />
    </VitrylaProvider>
  )
};

export const CustomTokens: Story = {
  render: () => (
    <VitrylaProvider
      style={{ padding: 16 }}
      tokens={{
        color: {
          background: { light: "#ffffff", dark: "#1a0f14" },
          primary: { light: "#ec4899", dark: "#f472b6" },
          primaryForeground: { light: "#ffffff", dark: "#1a0f14" }
        },
        radius: { md: "16px" }
      }}
    >
      <ThemeSwitcher />
      <Swatches />
    </VitrylaProvider>
  )
};
