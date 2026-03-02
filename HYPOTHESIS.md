# Aura Wellness — A/B Test Hypothesis Document

---

## 1. Core Assumptions

### Target Audience
**B2C.** Primarily Millennial and Gen Z individuals who prioritize holistic wellness, organic lifestyles, and high-quality digital experiences. They possess high aesthetic standards, resonate with contemporary minimalist brands, and are highly immune to aggressive, traditional direct-response marketing.

### Awareness Level
**Mixed (Warm to Solution-Aware).** Users are either product-aware from top-of-funnel social campaigns, or highly solution-aware and actively searching for premium remedies to digital burnout.

### Product Positioning
**"Aura Wellness"** is positioned as a premium digital membership solving modern burnout by bridging the gap between studio-grade mindful movement and daily organic living.

### Traffic Source & Temperature
A hybrid approach capturing two distinct traffic streams:

| Source | Temperature | Behavior |
|---|---|---|
| Social Discovery (Meta / TikTok) | Warm, easily distracted | Responds to immediate visual impact |
| Google Search Intent (Organic / Paid) | High-intent, actively seeking | Responds to clear value propositions |

The landing page must balance immediate visual impact for social traffic with clear, SEO-friendly value propositions for search traffic.

### Brand & Tone Direction
Editorial, minimalist, and calming. The UI relies heavily on negative space, elegant typography, and a muted earthy color palette to reflect mindfulness.

---

## 2. Metrics

### Primary Metric
**CTA click-through rate** — tracked as the `signed_up` event via PostHog, fired on CTA click before redirect to the signup page.

### Secondary Metrics
- Scroll depth to primary CTA
- Time on page
- Bounce rate
- Return visit rate

### Why These Metrics
The primary metric directly measures signup intent, which is the core conversion goal. Secondary metrics reveal where audience drop-off occurs and whether users are engaging with the page at all — critical for diagnosing whether a variant underperforms due to copy, layout, or offer framing.

---

## 3. Landing Page Variants

### `/control` — Brand & Aesthetic Driven (Baseline)

**Methodology:** Aesthetic Halo Effect / Long-Form Brand Storytelling

**What this baseline establishes:**
The control variant uses a classic, long-form editorial layout driven by high-production background video and aspirational brand storytelling. It focuses on comprehensive feature education over urgency, with a soft CTA: *"Start Your Journey"*.

**Why this is the baseline:**
This approach assumes the Aesthetic Halo Effect is the primary conversion driver for a premium wellness brand. It is designed to capture high-intent Google searchers looking for deep product information, while simultaneously building immediate brand equity with a sophisticated social audience.

**What we expect to learn:**
This establishes our baseline conversion rate for a purely brand-driven narrative. If it outperforms the test variants, it indicates our audience values brand alignment and aesthetic education over urgency or community validation.

---

### `/variant-1` — Scarcity & Exclusivity (Primary Hypothesis)

**Methodology:** Scarcity Principle + FOMO

**What changed:**
We replaced the control's brand-storytelling structure with a full-funnel, urgency-layered page built around an exclusive "Founding Member" invitation. Key implementation details:

- **UrgencyBanner** — fixed top bar displaying live remaining spot count (*"Only 127 founding spots left"*), persistent across scroll
- **Hero** — full-bleed nature video background (dawn creek mist) with an animated spot counter counting down from 189 → 127, a "Live Availability" pulsing indicator, and a frosted-glass "Founding Member Invitation" badge. LiveActivity ticker pinned to the bottom of the hero shows real-time member join activity
- **What You're Locking In** — three founding-only benefit cards (Lifetime Price Lock, Founding Member Circle, Personal Intake Call) with non-clickable hover animations
- **Why Only 200?** — founder profile section (Maya Chen, Co-founder & CEO) with a personal editorial quote explaining the deliberate capacity cap, adding authenticity to the scarcity claim
- **Founding Member Offer** — glassmorphism pricing card over a nature video background, with animated price count-down from $29 → $19, staggered benefit reveal, and a gold "Save 35%" badge
- **FoundingQuotes** — three FOMO-reinforcing pull quotes from members
- **Primary CTA:** *"Claim Your Founding Spot"*

**Why this could improve conversion:**
This leverages the Scarcity Principle and FOMO. For high-intent search traffic ready to make a decision, framing the offer as a limited-availability tier provides the immediate psychological push needed to close the subscription on the first visit. The price count-down ($29 → $19) and founder message add a layer of authenticity that softens the urgency without undermining it — critical for a mindfulness audience sensitive to aggressive sales tactics.

**What we expect to learn:**
We will learn whether exclusivity and urgency can override the need for deep aesthetic product education within this demographic. If it underperforms, we can conclude that aggressive scarcity tactics alienate a mindfulness-oriented audience — an important signal for all future campaign creative.

---

### `/variant-2` — Social Proof & Identity Alignment (Secondary Hypothesis)

**Methodology:** Social Proof + Community Belonging

**What changed:**
We replaced the control's idealized, high-production assets with an editorial + UGC, community-layered structure. Rather than a single grid, the page layers multiple forms of social evidence across the full funnel:

- **Hero** — community-focused headline (*"Join 10,000+ Members Already Thriving"*) with member count stats and a CTA framed around belonging rather than product features
- **UGC Grid** — authentic photo and video grid of real members with names and cities, paired with count-up stats (10,000+ members, 41 countries, 2.3M sessions, 94% satisfaction)
- **Who Joins Aura** — four identity archetype cards (The Burnt-Out Professional, The New Mum, etc.) designed to create immediate self-identification and lower psychological distance
- **Editorial Feature Chapters** — four Z-pattern editorial sections (Movement, Breathwork & Meditation, Live Sessions, Wellness Journal) using long-form prose and editorial photography to build product understanding without sterile feature lists
- **Voice Testimonials** — three member story cards with live wave animation and Web Speech API playback, making social proof audible and tangible
- **Social Proof Stats** — animated count-up stats reinforcing scale and credibility
- **Primary CTA:** *"Join the Community"*

**Why this could improve conversion:**
This relies on the Social Proof principle. For users arriving via comparison-based Google searches (e.g., *"Aura Wellness vs. Alo Moves"*), seeing relatable peers achieving tangible results lowers perceived risk and creates identity alignment — which can be more persuasive than polished brand imagery for an audience skeptical of over-produced marketing. The identity archetype cards and voice testimonials add a depth of peer validation not achievable through static quotes alone.

**What we expect to learn:**
We will determine whether relatability and community validation are stronger conversion drivers than the premium brand positioning of the control. If it fails, it suggests our audience primarily seeks an aspirational escape rather than peer validation — which would guide us toward doubling down on brand prestige in future iterations.

---

## 4. Summary Table

| Variant | Methodology | CTA Copy | Layout Style | Primary Lever |
|---|---|---|---|---|
| `/control` | Aesthetic Halo Effect | "Start Your Journey" | Long-form, editorial | Brand trust + education |
| `/variant-1` | Scarcity + FOMO | "Claim Your Founding Spot" | Full-funnel, urgency-layered | Limited availability + price anchoring |
| `/variant-2` | Social Proof | "Join the Community" | Editorial + UGC, community-layered | Peer validation + identity alignment |
