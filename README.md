# Tile Explorer

A simple educational web app that helps students explore how patterns can be used to tile a surface.

## Features
- Draw a custom pattern by clicking squares (adjacency enforced)
- Tile a larger surface with your pattern, no overlaps, minimal gaps
- Each pattern instance is colored (up to 10 colors, then repeats)
- Responsive design: desktop (side-by-side), mobile (stacked)
- Coverage percentage displayed

## Getting Started

### Prerequisites
- Node.js and npm installed

### Install dependencies
```bash
npm install
```

### Run locally
```bash
npm start
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
assets/      # images, icons, etc.
css/         # stylesheets
js/          # JavaScript source
index.html   # main HTML file
app.json     # project metadata
package.json # npm config
LICENSE      # license
```

## Deployment
You can deploy this app using any static site host (e.g., GitHub Pages, Vercel, Netlify) or by serving with npm as above.

## License
See LICENSE file.
