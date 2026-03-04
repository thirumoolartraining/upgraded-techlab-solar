---
name: techlab-ops
description: Commands for TechLab Solars development, testing, and deployment.
---

# Operational Skills
Use these commands to manage the project:

- **Development:** `npm run dev` (Vite HMR)
- **Type Check:** `npx tsc --noEmit` (Run this before every commit)
- **Build & Preview:** `npm run build && npm run preview`
- **Component Audit:** `npx shadcn-ui@latest add [component]`
- **SEO Check:** Use this skill to verify `index.html` has a `<title>` and `<meta name="description">`.

*Note: Deployment is handled automatically by Render on push to 'main'.*