# Personal portfolio

A frontend-only portfolio built with **React + TypeScript + Vite**. Responsive, with light/dark themes, filterable projects, project detail dialogs, experience, skills, contact links, and a downloadable CV.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. For production, run `npm run build` and deploy the generated `dist/` folder to any static host. No server, database, or API key is needed.

## Make it yours

**Edit [`src/data/portfolio.ts`](src/data/portfolio.ts).** Your supplied profile, experience, and projects are included. The project section contains professional remittance and claims-processing contributions, plus TeaShopPOS and StreamX as personal projects. All content remains editable. The mock API asynchronously returns this typed response; there is no network dependency for the content.

| Content                               | Where to edit                                    |
| ------------------------------------- | ------------------------------------------------ |
| Name, role, initials, location, email | `data.profile`                                   |
| Hero headline and introduction        | `data.profile.headline` / `introduction`         |
| About, current focus, interests       | `data.profile.about` / `currently` / `interests` |
| Social profile links                  | `data.profile.socials`                           |
| Project cards and case studies        | `data.projects`                                  |
| Skills and disciplines                | `data.expertise`                                 |
| Work timeline                         | `data.experience`                                |
| Education                             | `data.education`                                 |
| Contact heading and email subject     | `data.contact`                                   |
| Availability text and indicator       | `data.profile.available` / `availability`        |

Add or remove items freely. Project filters are generated from the unique `category` values (currently Professional and Personal). Set `image` to a screenshot or illustration URL (for example `/projects/my-app.webp`, with the file in `public/projects/`), or keep `null` for a simple preview using the project’s name and category. Professional cards describe your contributions and employer without requiring public source or live links.

Education appears in the About section and the PDF CV. The Computer Engineering entry at IOE Purwanchal Campus, Dharan, uses your supplied details. Its optional `period` is left `null`; add your actual study dates or graduation year when desired. Education can be extended with more entries or omitted entirely.

Add your URLs to `links.live` and `links.source`; links set to `null` are hidden. Use full `https://` URLs. Project cards always open their case study with `overview`, `highlights`, and `role`. Edit `public/favicon.svg` and the initial title/description in `index.html` for your identity; the loaded profile also updates the title and description at runtime.

TeaShopPOS and StreamX are private: their repository links are omitted, and their descriptions say “Demo available upon request.” This also applies to the generated PDF CV. The GitHub social link leads to your profile.

The section initially shows two projects. **See more** reveals additional entries, and **See less** collapses them. Changing a category resets the visible count. Configure the initial number and reveal increment through `data.projectDisplay`; adding more projects to the array automatically makes them available through See more. The CV includes all projects regardless of which ones are expanded on screen.

### Add your CV

The default CV is a searchable **PDF generated in the browser from your profile data**, including your profile, clickable contact links, skills, experience, and projects. It includes automatic page breaks and page numbers. Edit the mock response and the next download reflects your changes. No backend is needed, and PDF support loads only when someone clicks “Download CV”.

To offer your own pre-designed PDF instead:

1. Place the PDF at `public/cv.pdf`.
2. Set `profile.cv` to `{ url: '/cv.pdf', filename: 'Your-Name-CV.pdf' }`.

Use a same-origin file for reliable downloading. You can use any supported file type; the button displays the extension automatically.

### Contact behavior

“Say hello” opens the visitor's mail app addressed to `profile.email`, using `contact.subject`. Copy email copies that address and announces the result. Update `hello@example.com` before sharing the site. There is no backend and no simulated successful form submission.

### Themes and style

The first visit follows the system preference. The theme button saves an explicit preference in local storage and prevents startup theme flash. Both themes use the semantic variables in `src/styles/tokens.css`; layout and components are in `src/styles/global.css`. Fonts are bundled locally. Visual intent is recorded in `DESIGN.md`.

### Optional future API

Replace `getPortfolio()` in `src/features/portfolio/api.ts` with a real fetch if needed. Preserve the `PortfolioResponse` shape and abort signal. The present implementation remains fully frontend-only and works without an internet connection after the static assets load.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npm run format:check
npm run build
```

## References

The content hierarchy and interaction direction were informed by [Brittany Chiang](https://brittanychiang.com/), [Rauno Freiberg](https://rauno.me/), and [Bruno Simon](https://bruno-simon.com/). The layouts, copy, code, illustrations, and miniature app previews here are original. No third-party portfolio code was copied.
