# Vitryla UI

Vitryla UI is a composable React component library built with TypeScript, focused on accessibility, native web APIs, and flexible customization.

Unlike traditional component libraries, Vitryla UI provides both ready-to-use components and reusable headless primitives that can be combined to build custom components.

The library aims to provide:

- Accessible components with keyboard navigation and proper ARIA support by default.
- A native-first approach that takes advantage of modern browser APIs.
- Flexible theming through CSS variables and design tokens.
- Component composition without unnecessary abstractions.
- Customizable styles using plain CSS, without Tailwind or CSS-in-JS.

## Architecture

Vitryla UI follows a layered architecture:

- **Tokens** — design tokens and CSS custom properties.
- **Utils & Hooks** — shared utilities and reusable logic.
- **Primitives** — low-level building blocks such as Dialog, Popover, and Listbox.
- **Components** — styled, ready-to-use components built from primitives.
- **Provider** — centralized configuration, theming, and localization.

Complex components can be composed from simpler primitives. For example, a Combobox can be built using Input, Popover, and Listbox.

## Technologies

- [React](https://react.dev/) — UI library.
- [TypeScript](https://www.typescriptlang.org/) — type-safe development.
- [Vite](https://vite.dev/) — library bundling.
- CSS — styling with custom properties and cascade layers.
- [Storybook](https://storybook.js.org/) — component development and documentation.
- [Vitest](https://vitest.dev/) — testing.
- [Testing Library](https://testing-library.com/) — component interaction testing.
- [Playwright](https://playwright.dev/) — browser testing.
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) — code quality and formatting.

## Running the Project

1. Install [Node.js](https://nodejs.org/) and npm on your system.

2. Clone the repository:

```bash
git clone https://github.com/NikitaBerezhnyj/vitryla-ui.git
cd vitryla-ui
```

3. Install dependencies:

```bash
npm install
```

4. Start Storybook:

```bash
npm run storybook
```

5. Run tests:

```bash
npm run test
```

## License & Community Guidelines

- [License](LICENSE) — project license.
- [Code of Conduct](CODE_OF_CONDUCT.md) — expected behavior for contributors.
- [Contributing Guide](CONTRIBUTING.md) — how to help the project.
- [Security Policy](SECURITY.md) — reporting security issues.

## Feedback

If you have suggestions or find bugs, please create an issue on [GitHub](https://github.com/NikitaBerezhnyj/vitryla-ui/issues).
