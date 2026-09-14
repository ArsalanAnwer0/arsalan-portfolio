# Arsalan Portfolio

A personal portfolio built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.

The production build is a static export. Next.js writes the deployable website to `out/`, which can
be hosted without a long-running Node.js server.

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

## Container validation

The container build runs the complete quality gate and serves the exported site with an unprivileged
Nginx worker on port 8080:

```bash
docker build -t arsalan-portfolio:local .
docker run --rm -p 8080:8080 arsalan-portfolio:local
```

Open [http://localhost:8080](http://localhost:8080).

The production AWS architecture publishes the static `out/` artifact to S3 and CloudFront. The
container provides a reproducible validation and preview environment; it is not required at runtime
in AWS.

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
Dockerfile
nginx.conf
```

The Three.js scenes are intentionally retained for possible future use but are not loaded by the
current homepage.

See [docs/architecture.md](docs/architecture.md) for the planned AWS deployment architecture and
the reasoning behind it.
