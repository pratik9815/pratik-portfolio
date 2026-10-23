# Pratik Chamlagain — Software Engineering Portfolio

My personal portfolio, built with **React, TypeScript, and Vite**. It brings together my professional work in remittance, banking, and claims processing, my personal projects, education, and a downloadable PDF CV.

**Portfolio:** [pratik9815.github.io/pratik-portfolio](https://pratik9815.github.io/pratik-portfolio/)

## Features

- Responsive layout with light and dark themes, system-preference support, and a saved theme choice.
- Professional and Personal project filters, expandable project listings, and project detail dialogs.
- Work experience at Inficare Pvt. Ltd. and Smart Data Solutions.
- Computer Engineering education at IOE Purwanchal Campus, Dharan.
- A searchable PDF CV generated from the portfolio data, with page numbers and clickable contact links.
- Email contact and copy-to-clipboard, keyboard navigation, visible focus, and reduced-motion support.

The application runs entirely in the browser. Its asynchronous mock API reads a local TypeScript response; no backend, database, or API credentials are required.

## Projects

| Project                    | Type         | Focus                                                                            |
| -------------------------- | ------------ | -------------------------------------------------------------------------------- |
| Remittance System          | Professional | C#, ASP.NET Framework, SQL Server, IIS, and Azure DevOps at Inficare Pvt. Ltd.   |
| Claims Processing Workflow | Professional | Java, SQL, paper-to-EDI conversion, and claims workflows at Smart Data Solutions |
| TeaShopPOS                 | Personal     | ASP.NET Core MVC, PostgreSQL, SignalR, and GitHub Actions CI/CD                  |
| StreamX                    | Personal     | Real-time messaging, SignalR, PostgreSQL, JWT, and GitHub Actions CI/CD          |

TeaShopPOS and StreamX are private repositories. Their descriptions state **“Demo available upon request”** and omit source and live links, including in the PDF CV.

## Local development

Use **Node.js 24.x** and npm. Install the locked dependencies, then start Vite:

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. The project uses `/pratik-portfolio/` as its base path in development and production.

## Validation and production preview

```sh
npm run check
npm run preview
```

`check` runs ESLint, Prettier validation, the Vitest test suite, TypeScript checking, and a production build. `preview` serves the generated `dist/` folder locally; open its printed URL.

Individual commands are also available:

| Command                | Purpose                                                 |
| ---------------------- | ------------------------------------------------------- |
| `npm run typecheck`    | Check TypeScript                                        |
| `npm run lint`         | Check React, TypeScript, Hooks, and accessibility rules |
| `npm test`             | Run unit and interaction tests                          |
| `npm run format`       | Format project files                                    |
| `npm run format:check` | Check formatting                                        |
| `npm run build`        | Type-check and generate the production site in `dist/`  |

## GitHub Pages deployment

This repository uses the **`gh-pages` package** to publish the built site to the `gh-pages` branch.

1. Ensure Git is authenticated for this repository and your local `origin` points to `pratik9815/pratik-portfolio`.
2. Run:

   ```sh
   npm run deploy
   ```

   The `predeploy` script runs all checks and builds the site first. If they pass, `gh-pages` publishes `dist/` and adds `.nojekyll`.

3. In **Settings → Pages → Build and deployment**, select **Deploy from a branch**, choose **`gh-pages`**, select **`/(root)`**, and save. The branch must exist before it can be selected.
4. The configured site address is [Pratik's portfolio](https://pratik9815.github.io/pratik-portfolio/).

`vite.config.ts` sets `base: '/pratik-portfolio/'`. Data-driven project images and configured CV files resolve through `import.meta.env.BASE_URL`, so local asset URLs also work under the repository prefix. If the repository name or hosting path changes, update the Vite base, the `homepage` metadata, and the portfolio URL above before rebuilding.

Deployment references: [Vite's GitHub Pages guide](https://vite.dev/guide/static-deploy.html#github-pages) and [GitHub's publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Portfolio content

Edit **[src/data/portfolio.ts](src/data/portfolio.ts)**. The same typed response drives the page and the generated CV.

| Content                                                 | Data field                                                                 |
| ------------------------------------------------------- | -------------------------------------------------------------------------- |
| Name, role, contact details, location, and social links | `data.profile`                                                             |
| Hero, About text, current focus, and interests          | `data.profile.headline`, `introduction`, `about`, `currently`, `interests` |
| Professional contributions and personal projects        | `data.projects`                                                            |
| Initial project count and See more increment            | `data.projectDisplay`                                                      |
| Skills                                                  | `data.expertise`                                                           |
| Employment timeline                                     | `data.experience`                                                          |
| Education and optional study dates                      | `data.education`                                                           |
| Contact copy and email subject                          | `data.contact`                                                             |

Project categories generate the filters automatically. The first two entries appear initially; **See more** reveals the remaining projects and **See less** collapses them. Category changes reset the visible count. The CV includes every project, regardless of the expanded state.

Put project images in `public/projects/` and reference them as `/projects/filename.svg` or `/projects/filename.webp`. External image URLs are also supported. A `null` image uses a text-based preview; `null` source and live URLs hide those links.

### CV and contact

With `profile.cv.url: null`, **Download CV** generates a PDF from the current data. PDF support loads on demand. To offer a separately designed PDF, place it in `public/cv.pdf` and set:

```ts
cv: { url: '/cv.pdf', filename: 'Pratik-Chamlagain-CV.pdf' }
```

The file URL automatically respects the GitHub Pages base path. Use a same-origin file for a direct download.

**Say hello** opens an email draft to `profile.email` with `contact.subject`. The site does not submit contact messages to a server.

## Code organization

- `src/components/`: navigation, project previews and dialogs, education, and CV download controls.
- `src/data/portfolio.ts`: editable content.
- `src/features/portfolio/`: types, mock API, loading state, PDF generation, and tests.
- `src/lib/publicAssetUrl.ts`: public asset resolution for repository-based hosting.
- `src/styles/`: shared design tokens, responsive layouts, and both themes.
- `public/`: favicon and original project illustrations.
- [DESIGN.md](DESIGN.md): maintained visual and interaction decisions.

Fonts are bundled locally using Fontsource. Icons use Lucide, PDF generation uses jsPDF, and interaction tests use Vitest and React Testing Library.
