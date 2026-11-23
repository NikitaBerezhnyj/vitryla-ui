import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, TabsContent, TabsList, TabsTrigger, type TabsProps } from "./tabs";

function Example(props: TabsProps) {
  return (
    <Tabs defaultValue="account" {...props}>
      <TabsList aria-label="Settings">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings</TabsContent>
      <TabsContent value="password">Password settings</TabsContent>
      <TabsContent value="billing">Billing settings</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("shows the panel of the default tab and hides the others", () => {
    render(<Example />);
    expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Account settings");
    expect(screen.getByText("Password settings")).not.toBeVisible();
  });

  it("selects a tab when clicked", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("tab", { name: "Password" }));
    expect(screen.getByRole("tab", { name: "Password" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Password settings");
  });

  it("moves focus and selection with arrow keys", async () => {
    render(<Example />);
    await userEvent.tab();
    await userEvent.keyboard("{ArrowRight}");
    const password = screen.getByRole("tab", { name: "Password" });
    expect(password).toHaveFocus();
    expect(password).toHaveAttribute("aria-selected", "true");
  });

  it("wraps around at the ends", async () => {
    render(<Example />);
    await userEvent.tab();
    await userEvent.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Billing" })).toHaveFocus();
  });

  it("jumps to the last and first tab with End and Home", async () => {
    render(<Example />);
    await userEvent.tab();
    await userEvent.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Billing" })).toHaveFocus();
    await userEvent.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "Account" })).toHaveFocus();
  });

  it("skips disabled tabs when navigating with arrow keys", async () => {
    render(
      <Tabs defaultValue="account">
        <TabsList aria-label="Settings">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password" disabled>
            Password
          </TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
      </Tabs>
    );
    await userEvent.tab();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Billing" })).toHaveFocus();
  });

  it("keeps only the selected tab in the tab order", () => {
    render(<Example />);
    expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("tab", { name: "Password" })).toHaveAttribute("tabindex", "-1");
  });

  it("links tabs and panels with aria attributes", () => {
    render(<Example />);
    const tab = screen.getByRole("tab", { name: "Account" });
    const panel = screen.getByRole("tabpanel");
    expect(tab).toHaveAttribute("aria-controls", panel.id);
    expect(panel).toHaveAccessibleName("Account");
  });

  it("calls onValueChange when the selection changes", async () => {
    const onValueChange = vi.fn();
    render(<Example onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("tab", { name: "Billing" }));
    expect(onValueChange).toHaveBeenCalledWith("billing");
  });

  it("does not change a controlled value by itself", async () => {
    const onValueChange = vi.fn();
    render(<Example value="account" onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("tab", { name: "Password" }));
    expect(onValueChange).toHaveBeenCalledWith("password");
    expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute("aria-selected", "true");
  });
});
