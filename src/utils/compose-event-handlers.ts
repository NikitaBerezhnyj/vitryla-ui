type Handler<E> = ((event: E) => void) | undefined;

export function composeEventHandlers<E extends { defaultPrevented: boolean }>(
  external: Handler<E>,
  internal: Handler<E>,
  { checkForDefaultPrevented = true } = {}
) {
  return (event: E) => {
    external?.(event);
    if (!checkForDefaultPrevented || !event.defaultPrevented) {
      internal?.(event);
    }
  };
}
