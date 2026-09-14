# Arsalan Portfolio

A personal portfolio built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.

The homepage has two presentations:

- A professional side focused on backend engineering, cloud infrastructure, and research.
- A personal side focused on hobbies, anime, and games.

Move the pointer to the right or left edge of a desktop screen to switch sides. Use the floating
button on smaller screens. The left and right arrow keys provide keyboard navigation.

## Local development

Requirements:

- Node.js 22 or newer
- npm

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

Run every check with:

```bash
npm run check
```

Use `npm run format` to apply the repository's formatting rules.

## Project structure

```text
components/
  LoadingScreen.tsx
  scenes/
    DeskScene.tsx
    PS5Scene.tsx
pages/
  _app.tsx
  index.tsx
public/
  favicon.ico
  icon.png
styles/
  globals.css
```

The Three.js scenes are intentionally retained for possible future use but are not loaded by the
current homepage.
