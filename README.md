# Kenzy Hasnaoui · Portfolio

Static portfolio built with [Astro](https://astro.build), editable through [Keystatic](https://keystatic.com) at `/keystatic`, deployed on [Vercel](https://vercel.com).

## Where things live

| What | File | Edit in admin |
|---|---|---|
| Name, intro, photo, "Currently", stats, contact | `src/content/site.yaml` | Intro & contact |
| Timeline (experience + education) | `src/content/career.yaml` | Career & education |
| Skill cards | `src/content/skills.yaml` | Skills |
| One file per project | `src/content/projects/*.yaml` | Projects |
| Photos | `public/images/` (projects in `public/images/projects/`) | upload from any image field |
| Project drawings | `src/figures/*.svg` | pick one in "Drawing" |
| Design (colours, fonts, layout) | `src/styles/global.css`, `src/pages/index.astro` | — |

A project shows its **photo** if one is uploaded, otherwise its **drawing**. Projects are sorted by the **Order** field.

## Run locally

```bash
npm install
npm run dev          # site at http://localhost:4321, admin at http://localhost:4321/keystatic
```

Locally, Keystatic saves straight to the files on disk (commit and push them yourself).
On the live site it saves to GitHub, and Vercel redeploys automatically.

## One-time setup: deploy + online editing

### 1. Deploy on Vercel
1. Go to vercel.com → **Add New… → Project** → import `kenzy357/portfolio`.
2. Framework preset is detected as **Astro**. Keep the defaults and click **Deploy**.
3. You get `https://<project>.vercel.app`. Add a custom domain under **Settings → Domains** if you want one.

### 2. Connect Keystatic to GitHub (so `/keystatic` works on the live site)
Keystatic needs a small GitHub App so it can commit on your behalf. It creates it for you:

1. Locally, run `PUBLIC_KEYSTATIC_GITHUB=true npm run dev` and open `http://localhost:4321/keystatic`.
2. Follow the on-screen "Create GitHub App" flow. Name it e.g. `kenzy-portfolio-keystatic`, install it
   on the `portfolio` repo only.
3. Keystatic writes these to a local `.env` file:
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET`
   - `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
4. Copy all four into Vercel → **Settings → Environment Variables**, then **Redeploy**.
5. In the GitHub App settings, add the callback URL
   `https://<your-domain>/api/keystatic/github/oauth/callback`.
6. Never commit `.env` (it is already in `.gitignore`).

Then: open `https://<your-domain>/keystatic`, sign in with GitHub, edit, **Save**. Each save is a commit; Vercel rebuilds in about a minute.

## Adding a project
Admin → Projects → **Create**. Fill in title, code (e.g. `P-14`), order, where, status, summary, details, tools,
then upload a photo or pick a drawing. To link it from the timeline or a skill card, add it under
"Linked projects" / "Used in projects" there.
