import type { Preview } from "@storybook/react-vite";
import { VitrylaProvider, type Theme } from "../src";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },

  globalTypes: {
    theme: {
      description: "Тема Vitryla",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["system", "light", "dark"],
        dynamicTitle: true
      }
    }
  },

  initialGlobals: {
    theme: "light"
  },

  decorators: [
    (Story, context) => (
      <VitrylaProvider
        theme={context.globals.theme as Theme}
        style={{ minHeight: "100vh", padding: "1rem" }}
      >
        <Story />
      </VitrylaProvider>
    )
  ]
};

export default preview;
