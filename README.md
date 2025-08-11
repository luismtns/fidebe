# Fidebe Widget

> A modern React component for floating feedback collection, with screenshot capture and context enrichment.

## About the Project

**Fidebe Widget** is a reusable React component that provides a floating widget for user feedback collection, including automatic screenshot capture, image uploads, and environment/context enrichment. The goal is to offer a minimal, pluggable, and easy-to-embed experience for any web application, with full control via callbacks and customization props.

### Key Features

- Customizable floating button
- Modal for feedback description
- Multiple image uploads
- Context information submission (browser, platform, route, console logs)
- Styling with TailwindCSS + ShadCN UI
- Easy integration via props and callbacks

## Installation

```bash
pnpm add @luisbovo/fidebe
# or
npm install @luisbovo/fidebe
# or
yarn add @luisbovo/fidebe
```

## Basic Usage

```tsx
import { FidebeWidget } from '@luisbovo/fidebe'

;<FidebeWidget onSubmit={handleFeedback} onImageUpload={handleImageUpload} extraContext={{ route: '/home' }} />

// Example handlers:
function handleFeedback(data) {
  // Send feedback data to your backend or analytics
}

function handleImageUpload(formData) {
  // Handle image upload (e.g., send to storage or backend)
}
```

## Props

| Prop          | Type             | Description                                                         |
| ------------- | ---------------- | ------------------------------------------------------------------- |
| label         | string/ReactNode | Text or node for the floating button (optional, default: icon+text) |
| className     | string           | Extra CSS class for button customization (optional)                 |
| style         | object           | Inline style for the button (optional)                              |
| dialog\*      | various          | Extensive dialog/modal customization props (see source for all)     |
| onSubmit      | function         | Callback for feedback submission (required for integration)         |
| onImageUpload | function         | Callback for image upload (optional)                                |
| extraContext  | object           | Additional context to send (optional)                               |

## How it Works

1. The user clicks the floating button.
2. A modal opens to type feedback and attach images.
3. The component automatically captures the screen (screenshot).
4. Upon submission, the feedback, images, and context are sent via the provided callbacks (`onSubmit`, `onImageUpload`).

## Main Scripts

- `pnpm dev` — Storybook preview with Hot Reload
- `pnpm build` — Build the Storybook
- `pnpm build:lib` — Build the library for publishing
- `pnpm lint` — Lint with Biome
- `pnpm format` — Format with Biome
- `pnpm test` — Unit tests with Vitest

## Development

The project uses:

- [React 19](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Storybook 9](https://storybook.js.org/)
- [Vitest](https://vitest.dev/)
- [Biome](https://biomejs.dev/)

## Contribution

Contributions are welcome! Feel free to open issues or pull requests.

## License

[MIT](LICENSE)
