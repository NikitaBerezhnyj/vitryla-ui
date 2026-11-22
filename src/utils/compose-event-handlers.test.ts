import { composeEventHandlers } from "./compose-event-handlers";

describe("composeEventHandlers", () => {
  it("calls the external handler before the internal handler", () => {
    const calls: string[] = [];
    const handler = composeEventHandlers(
      () => calls.push("external"),
      () => calls.push("internal")
    );
    handler({ defaultPrevented: false });
    expect(calls).toEqual(["external", "internal"]);
  });

  it("skips the internal handler when the external handler calls preventDefault", () => {
    const internal = vi.fn();
    const event = { defaultPrevented: false };
    const handler = composeEventHandlers(() => {
      event.defaultPrevented = true;
    }, internal);
    handler(event);
    expect(internal).not.toHaveBeenCalled();
  });

  it("always calls the internal handler when checkForDefaultPrevented is false", () => {
    const internal = vi.fn();
    const handler = composeEventHandlers(undefined, internal, {
      checkForDefaultPrevented: false
    });
    handler({ defaultPrevented: true });
    expect(internal).toHaveBeenCalledOnce();
  });
});
