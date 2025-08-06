# 📝 Fidebe Widget

> React library for floating feedback collection with screenshot capture

## About the Project

**Fidebe Widget** is a reusable React component that provides a floating widget for user feedback collection, including automatic screenshot capture and image uploads. The goal is to offer a minimal, pluggable, and easy-to-embed experience for any web application.

### Key Features

- Customizable floating button
- Modal for feedback description
- Multiple image uploads
- Automatic screenshot capture (using html2canvas or native alternative)
- Context information submission (route, browser, platform)
- Styling with TailwindCSS + ShadCN UI
- Easy integration via props (`endpoint`)

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
;<FidebeWidget endpoint='https://your-backend.com/feedback' />
```

## Props

| Prop      | Type   | Description                                                  |
| --------- | ------ | ------------------------------------------------------------ |
| endpoint  | string | URL where the feedback will be sent (required)               |
| label     | string | Text for the floating button (optional, default: "Feedback") |
| className | string | Extra CSS class for button customization (optional)          |
| style     | object | Inline style for the button (optional)                       |

## How it Works

1. The user clicks the floating button.
2. A modal opens to type feedback and attach images.
3. The component automatically captures the screen (screenshot).
4. Upon submission, the feedback, images, and context are sent to the provided endpoint.

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
