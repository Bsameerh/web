# Sameer Bhattarai | Personal Archive

An interactive, archival-metaphor personal website designed to function like a physical dossier. 
Built using pure semantic HTML, CSS, and vanilla JavaScript powered by the GSAP FLIP plugin.

## Project Structure
- `index.html`: Semantic HTML structure and content.
- `styles.css`: Visual architecture, colors, typography, and FLIP-ready geometry.
- `app.js`: Logic for states (stack vs active) and physics animations via GSAP FLIP.

## Features
- **Physical Interaction Model:** Pull folders from a stack and watch them expand physically.
- **GSAP FLIP Animations:** Seamless transitioning between the stacked state and the full-screen extraction state.
- **Keyboard Accessible:** Fully navigable using Tab, Enter/Space, and Escape keys. Focus management built-in.
- **Responsive Architecture:** Degrades gracefully to vertical stacks on mobile screens.

## How to Run Locally
No build step is required. 
1. Open `index.html` directly in your web browser.
2. Alternatively, use a local server like Live Server in VS Code, or python:
   ```bash
   python -m http.server
   ```
   Then navigate to `http://localhost:8000`.

## Customization
- **Content:** Modify the text inside the `.content-interior` div of each `.folder` article in `index.html`.
- **Colors:** Adjust the `--folder-*` CSS variables in `styles.css` to change the dossier colors.
- **Links:** Update the placeholders in the `.footer-links` section at the bottom of `index.html`.

## Deployment
This is a static site. You can deploy the folder directly to:
- GitHub Pages
- Netlify (Drop the folder)
- Vercel

## Licensing Note
GSAP and its plugins (like Flip) are free for non-commercial use. Since this is a personal portfolio, it falls under the standard "No Charge" license.
