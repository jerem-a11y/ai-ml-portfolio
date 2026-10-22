# Jeremiah Adebusoye — Portfolio

A dark, editorial portfolio built with Next.js App Router, TypeScript, Tailwind CSS v4, and Lucide icons. Content is stored in `src/data/` and case studies are generated from the project data layer.

## Features

- Responsive one-page portfolio with floating navigation, scroll progress, mobile menu, and reduced-motion CSS support.
- CV-backed about, skills, experience, education, certifications, and community sections.
- Filterable project cards and statically generated `/projects/[slug]` case studies.
- Custom SVG neural-network illustration and CSS project visualizations; no WebGL dependency.
- Interactive educational classification, churn-score, and confusion-matrix demonstrations clearly labelled as synthetic simulations.
- Server-side GitHub public-repository endpoint with caching, fork/archived filtering, and failure states.
- Contact form with server-side validation, honeypot, and optional Resend email delivery.
- Resume download at `/resume.pdf` (copied from the supplied CV).
- SEO metadata, Person JSON-LD, `robots.txt`, and a sitemap when a canonical URL is configured.

## Source verification note

The supplied CV is the primary content source. The GitHub profile and API could not be inspected from the build environment because outbound DNS/network access was unavailable. As a result, project cards link to case studies rather than claiming unverified repository-specific URLs, metrics, or demos. The GitHub showcase fetches public repository metadata at runtime when deployed. Review repository README files and replace any generic case-study notes with verified evidence before publishing.

## Requirements

- Node.js 20.9+ (Node 22 LTS recommended)
- npm

## Install and run

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate for production

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```

## Environment variables

| Variable | Required? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended for production | Canonical site URL, sitemap URLs, and metadata base. Do not set until a domain exists. |
| `GITHUB_TOKEN` | Optional | Server-only GitHub API token to improve rate limits. Never expose with a `NEXT_PUBLIC_` prefix. |
| `RESEND_API_KEY` | Optional | Server-side email delivery through Resend. |
| `CONTACT_TO_EMAIL` | Required for email delivery | Inbox receiving portfolio enquiries. Defaults to the CV email in `.env.example`. |
| `CONTACT_FROM_EMAIL` | Required for email delivery | Verified sender address/domain in Resend. |

If Resend is not configured, the contact form displays a direct-email fallback instead of claiming delivery. Verify the sender domain in Resend before enabling production delivery.

## Deploy to Vercel

1. Push this project to a Git repository you control.
2. Import that repository into Vercel and select the Next.js framework preset.
3. Add the environment variables above in Vercel Project Settings → Environment Variables.
4. Set `NEXT_PUBLIC_SITE_URL` to the actual deployed custom domain or Vercel production URL.
5. Deploy, then test the resume download, GitHub API response, case-study routes, contact form, and mobile layout.
6. Configure Resend sender verification and test contact delivery before relying on the form.

## Content maintenance

- Profile: `src/data/profile.ts`
- Skills: `src/data/skills.ts`
- Projects and case studies: `src/data/projects.ts`
- Experience, education, certifications, community: `src/data/experience.ts`
- Replace `public/resume.pdf` whenever the CV changes.

## Notes

- No live demo links or project-specific repository links are claimed until verified.
- The 88% churn accuracy and 35% reporting turnaround reduction are taken from the CV.
- Playground charts and scores are illustrative, not measured project results.
- Set a real domain before publishing canonical URLs; no domain has been invented.
