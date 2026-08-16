# Vote4Gari

Static campaign website for Garishan Ravishankar.

## Structure

- `index.html`: main single-page site with all tab content and client-side form validation
- `Resources/vote4garishan-website.html`: source copy of the provided sample HTML
- `about.html`, `platform.html`, `ward.html`, `get-involved.html`, `donate.html`, `contact.html`: redirects to the matching section in `index.html`

## Forms

Forms validate in the browser and open a prefilled email to `vote4garishan@gmail.com`.

## GitHub Pages

This repo includes a GitHub Actions workflow that deploys the site to GitHub Pages on pushes to `main`.
