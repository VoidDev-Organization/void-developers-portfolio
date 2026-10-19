# Repository Guidelines

## Project Structure

This is a Vite and React portfolio. `src/App.jsx` composes the page sections; reusable UI is in `src/components/`, with 3D scenes in `src/components/canvas/`. Shared portfolio content (navigation, projects, team, and technology data) lives in `src/constants/index.js`. Styles are in `src/index.css` and `src/styles.js`; imported images and icons are in `src/assets/`. Files served directly by Vite, including 3D models and CVs, belong in `public/`.

## Development Commands

- `npm install` installs dependencies.
- `npm run dev` starts the local Vite server (normally at `http://localhost:5173`).
- `npm run lint` runs Oxlint with the React rules in `.oxlintrc.json`.
- `npm run build` creates the production site in `dist/`.
- `npm run preview` serves the production build locally after building.

## Code Style and Naming

Follow the existing JavaScript and JSX style: two-space indentation, double quotes for JavaScript strings, and semicolons. Use PascalCase for React components and filenames (for example, `SectionHeading.jsx`), camelCase for variables and functions, and descriptive lower-case names for static assets. Keep repeated content in `src/constants/index.js` rather than duplicating it across section components. Run `npm run lint` before submitting changes.

## Testing

No automated test script or test framework is configured in `package.json`. For UI changes, run the linter and production build, then check the affected page in `npm run dev` at desktop and mobile widths. For content or asset changes, verify the relevant section and links load correctly.

## Commits and Pull Requests

This checkout has no Git history available to establish a commit convention. Use short, imperative commit subjects that explain the change (for example, `Improve project gallery filtering`). Pull requests should describe the user-visible change, list relevant checks, link related issues when applicable, and include screenshots for visual updates.

## Configuration and Assets

Copy `.env.example` to `.env` for local EmailJS configuration; keep credentials out of commits. Add technology icons under `src/assets/tech/` and import them through `src/assets/index.js`. Keep downloadable CVs in `public/cv/` and reference them by filename.
