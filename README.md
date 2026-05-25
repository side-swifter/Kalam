# The Kalam Project Website

Modern, visually-driven website built with React, TypeScript, and TailwindCSS.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Features

- React 18 with TypeScript
- TailwindCSS for styling
- Lucide React for icons
- Fully responsive design
- Smooth scroll navigation
- Google Apps Script-connected involvement form

## Google Apps Script Form

Create a `.env.local` file with your deployed Apps Script web app URL:

```bash
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

The website submits these form fields with a `POST` request:

- `name`
- `email`
- `interest`
- `submittedAt`
- `source` (`kalam-website`)

The Apps Script deployment should accept form-encoded POST data in `doPost(e)`, write the values to your sheet, and be deployed as a web app accessible to website visitors.

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Build Tool**: Vite
