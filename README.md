# Aura Wellness
This repository contains the technical implementation for the Aura Wellness landing page A/B test. It features three distinct variants built on a single, strictly DRY Next.js architecture, utilizing a centralized configuration pattern to render polymorphic components.

## Project Deliverables

- **Live Demos:**
  - [Control (Baseline)](https://growth-marketing-assessment.vercel.app/control)
  - [Variant 1 (Scarcity)](https://growth-marketing-assessment.vercel.app/variant-1)
  - [Variant 2 (Social Proof)](https://growth-marketing-assessment.vercel.app/variant-2)
- **Strategy & Hypotheses:** [Read the Hypotheses Document](./HYPOTHESES.md)
- **Loom Videos:**
  - [Strategy Walkthrough (3 min)](#) \* [Technical Architecture Walkthrough (3 min)](#) ## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Analytics & A/B Testing:** PostHog

## Architectural Highlights

To satisfy the requirement of maintaining a single core layout/system without duplicating code, this project utilizes a **Centralized Configuration Architecture**.

1. **`config/variantConfig.ts`**: The single source of truth. It maps the URL routes (`/control`, `/variant-1`, `/variant-2`) to their specific copy, media assets, layout themes, CTA labels, and deterministic referral codes.
2. **Polymorphic Components**: Global components (e.g., `<HeroSection />`, `<SocialProof />`) accept data from the config and dynamically adjust their layout, styling (e.g., Dark Mode vs. Light Mode), and content.
3. **Flicker-Free Analytics**: PostHog is integrated to track the `signed_up` event safely.

## PostHog Tracking & CTA Logic

The primary conversion metric (`signed_up`) is handled by a custom `<CTAButton />` wrapper that ensures absolute data integrity:

- **Duplicate Prevention:** Disables the button immediately upon the first click.
- **Race-Condition Safety:** Wraps the PostHog `capture` event in a Promise with a 500ms timeout. This guarantees the event fires _before_ the redirect without trapping the user if the analytics script is blocked by an adblocker.
- **Deterministic Routing:** Appends the exact `?referralCode=` defined in the variant config to the final redirect URL (`https://ads.axon.ai/auth/signup`).

## Local Setup & Development

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/aura-wellness-ab-test.git](https://github.com/your-username/aura-wellness-ab-test.git)
   cd aura-wellness-ab-test
   ```
2. **Install Depedencies:**
   ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
   ```
3. **Configure Environment Variables:**
   Create a .env.local file in the root directory and add your PostHog keys:

   ```bash
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_api_key
   NEXT_PUBLIC_POSTHOG_HOST=[https://app.posthog.com](https://app.posthog.com)
   ```

4. **Getting Started:**

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Key Directory Structure
├── app/
│   ├── control/page.tsx       # Fetches control config & renders shared layout
│   ├── variant-1/page.tsx     # Fetches variant-1 config & renders shared layout
│   └── variant-2/page.tsx     # Fetches variant-2 config & renders shared layout
├── components/
│   ├── shared/                # 100% Reusable UI components (Hero, Features, etc.)
│   └── tracking/              # PostHog provider and CTA button logic
├── config/
│   └── variantConfig.ts       # Centralized routing and content configuration
└── HYPOTHESES.md              # Psychological methodology and experiment design
