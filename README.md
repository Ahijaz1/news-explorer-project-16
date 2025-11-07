# Project Title

## Stack & Setup

- Vite
- React
- React Router
- Node.js

## Folder Structure

- `src/components`: React components
- `src/utils`: helper functions & API
- `src/assets/images`: app images and logo
- `src/vendor`: third-party assets like fonts

## Install & Start Locally

```bash
npm install
npm run dev
```

## Branching

- All Stage 1 code on `stage-1-frontend-api` branch

## Project Dependencies

The following major packages are used in this project:

- `react` (UI library)
- `react-dom` (DOM integration for React)
- `react-router-dom` (routing)
- `styled-components` (CSS-in-JS styling)
- Any additional styling packages (e.g., Sass)

## Project Structure

src/
├─ assets/
│ └─ images/ # Images and logos
├─ components/ # Reusable React components
├─ utils/ # Utility JS functions
├─ vendor/
│ ├─ fonts/ # Third-party font files
│ └─ fonts.css # Font-face CSS definitions
├─ App.css # Main styling file
├─ App.jsx # Main app component
├─ main.jsx # App entry point

```

This modular structure ensures codebase clarity, scalability, and maintainability.
- **assets/** contains project visuals and assets.
- **components/** contains all React UI components.
- **utils/** contains helpers and business logic.
- **vendor/** contains third-party resources such as fonts.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
```
