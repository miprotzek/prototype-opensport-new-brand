# PlayWize AI – Insights (Prototype)

Next.js prototype for the PlayWize AI Chat / Insights page.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push this repo to GitHub (if you haven’t already).
2. Go to [vercel.com](https://vercel.com) and sign in.
3. **Add New Project** → **Import** your repository.
4. Leave the defaults (Framework: Next.js, Build Command: `npm run build`, Output: automatic).
5. Click **Deploy**.

Vercel will run `npm run build` and deploy the app. The project is set up so the build uses the correct project root and works in Vercel’s environment.

### Optional: deploy with Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts to link the project and deploy.
