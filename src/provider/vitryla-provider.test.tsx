import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VitrylaProvider, useTheme } from "./vitryla-provider";

function ThemeButton() {
  const { theme, setTheme } = useTheme();
  return <button onClick={() => setTheme("dark")}>{theme}</button>;
}

describe("VitrylaProvider", () => {
  it("defaults to the system theme", () => {
    render(<VitrylaProvider data-testid="root" />);
    expect(screen.getByTestId("root")).toHaveAttribute("data-vitryla-theme", "system");
  });

  it("updates the theme through useTheme", async () => {
    render(
      <VitrylaProvider data-testid="root">
        <ThemeButton />
      </VitrylaProvider>
    );
    await userEvent.click(screen.getByRole("button", { name: "system" }));
    expect(screen.getByTestId("root")).toHaveAttribute("data-vitryla-theme", "dark");
  });

  it("does not allow internal changes to a controlled theme", async () => {
    render(
      <VitrylaProvider theme="light" data-testid="root">
        <ThemeButton />
      </VitrylaProvider>
    );
    await userEvent.click(screen.getByRole("button", { name: "light" }));
    expect(screen.getByTestId("root")).toHaveAttribute("data-vitryla-theme", "light");
  });

  it("applies custom tokens as CSS variables", () => {
    render(<VitrylaProvider data-testid="root" tokens={{ color: { primary: "#ec4899" } }} />);
    expect(screen.getByTestId("root").style.getPropertyValue("--vitryla-color-primary")).toBe(
      "#ec4899"
    );
  });

  it("throws an error when useTheme is used outside the provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ThemeButton />)).toThrow(/VitrylaProvider/);
    spy.mockRestore();
  });
});
