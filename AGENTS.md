# AGENTS.md

## Project Overview

**Fidebe Widget** is a reusable React component designed to provide a floating widget for user feedback collection. It includes features like automatic screenshot capture, image uploads, and submission of contextual information (e.g., route, browser, platform). The component is styled using TailwindCSS and ShadCN UI, and it is built for easy integration into any web application.

### Key Features

- Floating button for feedback collection
- Modal with a description field and support for multiple image uploads
- Automatic screenshot capture using native alternatives
- Contextual information submission (e.g., current route, browser, platform)
- Customizable via props (`endpoint`, `label`, `className`, `style`)
- Built with modern tools like React, Vite, and TailwindCSS

## Best Practices for AI Agents

When working on this project, follow these guidelines to ensure consistency and quality:

### Codebase Understanding

1. **Component Purpose**: The widget is a UI + logic component, not a full application.
2. **Styling**: TailwindCSS and ShadCN UI are used for styling. Avoid introducing new styling libraries unless necessary.
3. **Data Submission**: The component sends feedback data (text, images, context) to an `endpoint` provided via props. Do not handle authentication or sensitive tokens directly in the component.

### Development Guidelines

1. **Modularity**: Keep the code modular and extensible for future features like adapters or admin panels.
2. **Testing**: Use Vitest for unit testing. Ensure all new features are covered by tests.
3. **Storybook**: Use Storybook to visually test and document components.
4. **Linting and Formatting**: Use Biome for linting and formatting. Ensure all code passes the linting rules before committing.

### Documentation

1. **README**: Keep the README up-to-date with installation, usage, and contribution guidelines.
2. **AGENTS.md**: Update this file with any new best practices or project changes relevant to AI agents.

### Communication

1. **Issues and PRs**: Use GitHub issues and pull requests to track changes and discuss features.
2. **Commit Messages**: Write clear and descriptive commit messages.

## Tools and Dependencies

- **React**: Core library for building the component.
- **Vite**: Build tool for fast development and production builds.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Vitest**: Testing framework for unit tests.
- **Storybook**: Tool for visual testing and documentation.
- **Biome**: Linting and formatting tool.

## Contribution Guidelines

1. **Follow the Code Style**: Use Biome for consistent code formatting.
2. **Write Tests**: Ensure all new features and bug fixes are covered by tests.
3. **Document Changes**: Update the README and AGENTS.md files with relevant information.
4. **Review Process**: Submit pull requests for all changes. Ensure they are reviewed and approved before merging.

## Future Directions

- **Web Component Support**: Extend the widget to be used as a web component.
- **Adapters**: Add support for different backend APIs.
- **Admin Panel**: Develop an admin panel for managing feedback.

By following these guidelines, AI agents can contribute effectively to the Fidebe Widget project while maintaining high standards of quality and consistency.
