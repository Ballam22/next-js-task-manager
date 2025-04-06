# [Final Project] Task Manager

**Labels:** `final-project` `typescript` `frontend` `backend` `api` `database` `authentication` `playwright` `jest` `documentation`

## Description

The task manager is a tool designed for project managers to manage projects, user stories, and tasks in an agile environment. The app includes a dashboard for visualizing progress, task management features, and user interactions—all built with TypeScript.

## Minimum Viable Features

- **Frontend Code:** Responsive UI built using React/Next.js.
- **Backend Code & API:** Node.js backend in TypeScript with a REST API.
- **Data Validation:** Zod for server-side input validation.
- **Database:** PostgreSQL to store projects, tasks, and user data.
- **User Authentication:** Custom registration and login system (no third-party libraries).
- **User Authorization:** Only task/project owners or assigned users can modify data.
- **Testing:** Unit tests for API and business logic; end-to-end tests to simulate user flows.
- **File Requirements:** At least 12 TypeScript files (excluding migrations).
- **Documentation:** README with project description, screenshots, and technology stack.
- **Favicon:** Custom favicon to identify the app.
- **Deployment:** Deployed web app on Vercel or Fly.io.

## Stretch Goals (Optional)

- Full TypeScript implementation across the entire codebase.
- Enhanced accessibility: keyboard and screen reader support.
- Frontend validation to complement backend checks.
- Performance optimizations and caching.
- SEO optimizations and improved meta tags.
- Integration with state management tools (e.g., Redux or XState).

## Project Breakdown

1. **Planning & Design:**

   - Create wireframes/mockups using Figma.
   - Design the database schema with DrawSQL (link to be added).

2. **Development Phases:**
   - **Phase 1:** Seting up project structure, configure the database, and build core API endpoints with authentication.
   - **Phase 2:** Develop the frontend dashboard and integrate it with the API.
   - **Phase 3:** Implement testing and Zod validation.
   - **Phase 4:** Finalize documentation, create a favicon, and deploy the app.

## Technologies

Next.js
Postgres
Jest
Playwright
Vercel

## Links

- [DrawSQL Database Diagram](#) _(Insert your DrawSQL link here)_
- [Favicon Generation Guide](https://learn.upleveled.io/pern-extensive-immersive/modules/cheatsheet-design-ux#generating-and-adding-favicons)
- [Deployment Guide for Fly.io](https://learn.upleveled.io/pern-extensive-immersive/modules/cheatsheet-deployment/#deploying-a-nextjs--postgresql-app-to-flyio)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev

```

## Tests

### Jest

```bash
pnpm jest
```

### Playwright

```bash
pnpm playwright test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

```
