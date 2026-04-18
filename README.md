# Portfolio Website

A modern, responsive personal portfolio built with React and TypeScript, designed to showcase your skills, projects, and contact information.

https://acolyer13.github.io/Portfolio-Website/

---

## Table of Contents

This website is a professional portfolio to present your background, skills, and work. It’s optimized for performance, accessibility, and easy updates.

## Tech Stack
- **Frontend:** React (TypeScript)
- **Build Tool:** Vite
- **Styling:** Custom CSS, Bootstrap utility classes
- **Icons:** Icon fonts (GitHub, LinkedIn)
- **Email Integration:** EmailJS (client-side email)
- **Map:** Google Maps iframe

## File & Folder Structure
```
public/           # Static assets (images, files)
src/
  App.tsx         # Main app component
  main.tsx        # React entry point
  App.css         # Global styles
  index.css       # Base styles
  assets/         # Images, icons
  components/     # Modular React components
    About.tsx
    Contact.tsx   # Contact form, info, map
    Footer.tsx
    Navbar.tsx
    Projects.tsx
    Resume.tsx
    Skills.tsx
    index.ts      # Barrel file
  data/
    portfolio.ts  # Project/skills data
index.html        # Main HTML entry
package.json      # Dependencies/scripts
vite.config.ts    # Vite config
tsconfig*.json    # TypeScript configs
eslint.config.js  # Linting rules
README.md         # Project documentation
```

## Key Features
- **Responsive Design:** Adapts to desktop and mobile
- **Navigation:** Sticky navbar
- **About Section:** Bio and summary
- **Skills Section:** Visual skills listing
- **Projects Section:** Showcase with links
- **Resume Section:** Download/view resume
- **Contact Section:**
  - Form (name, email, message)
  - EmailJS integration (no backend needed)
  - Google Map (Edina, MN)
  - Contact card (phone, email, social links)
- **Footer:** Social icons, copyright

## Setup & Development
1. **Install dependencies:**
   ```powershell
   npm install
   ```
2. **Start development server:**
   ```powershell
   npm run dev
   ```
3. **View in browser:**
   Open [http://localhost:5173](http://localhost:5173)

## Customization
- **Projects/Skills:** Edit `src/data/portfolio.ts`
- **Bio/Contact Info:** Update respective components in `src/components/`
- **Theme/Colors:** Edit `App.css`
- **Add Sections:** Create new components in `src/components/`

## Deployment
CI runs **`npm run build`** and pushes **only `dist/`** to the **`gh-pages`** branch (see **`.github/workflows/deploy.yml`**). GitHub Pages must publish **that** branch, not **`main`**.

1. Push to **`main`** (or **Actions → Deploy Vite site to GitHub Pages → Run workflow**).
2. **Settings → Pages → Build and deployment → Deploy from a branch:** branch **`gh-pages`**, folder **`/ (root)`** (not **`main`**). If **`main`** is selected, the site serves source **`index.html`** and **`main.tsx`** errors appear.
3. After the workflow runs, the live bundle is at `https://<user>.github.io/<repo>/` (e.g. **`/Portfolio-Website/`**).

**Repo → Settings → Actions → General → Workflow permissions:** set **Read and write** if the workflow cannot push to **`gh-pages`**.

A `.nojekyll` file under `public/` is copied into `dist/` for static hosting.

For manual production builds:
```powershell
npm run build
```

## Contributing
- Fork the repo and create a feature branch
- Follow code style and TypeScript conventions
- Submit pull requests with clear descriptions

## License
This project is open source and available under the MIT License.



### Additional Notes
- **Accessibility:** Form fields are labeled, interactive elements use proper roles/attributes.
- **Performance:** Vite enables fast reloads and optimized builds.
- **Extensibility:** Easily add new sections, update data, or change styles.
- **No backend required:** EmailJS handles contact form submissions securely from the client.
- **Security:** Map iframe uses lazy loading; external links use `rel="noopener noreferrer"`.

---

If you have questions or want to extend the site, check the source code or reach out via the contact form!
