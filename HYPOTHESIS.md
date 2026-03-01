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
We changed the layout to a short-form, urgency-driven structure featuring an exclusive "Founding Member" invitation. The primary variable is a dynamic capacity constraint (e.g., *"Only 200 Spots Remaining"*) and a direct CTA: *"Claim Your Invite"* — differing sharply from the control's long-form educational approach.

**Why this could improve conversion:**
This leverages the Scarcity Principle and FOMO. For high-intent search traffic ready to make a decision, framing the offer as a limited-availability tier provides the immediate psychological push needed to close the subscription on the first visit.

**What we expect to learn:**
We will learn whether exclusivity and urgency can override the need for deep aesthetic product education within this demographic. If it underperforms, we can conclude that aggressive scarcity tactics alienate a mindfulness-oriented audience — an important signal for all future campaign creative.

---

### `/variant-2` — Social Proof & Identity Alignment (Secondary Hypothesis)

**Methodology:** Social Proof + Community Belonging

**What changed:**
We replaced the control's idealized, high-production assets with a grid-based UI featuring authentic User-Generated Content (UGC) and realistic member transformations. The messaging pivots from an aspirational lifestyle narrative to community belonging, with a community-focused CTA: *"Join the Community"*.

**Why this could improve conversion:**
This relies on the Social Proof principle. For users arriving via comparison-based Google searches (e.g., *"Aura Wellness vs. Alo Moves"*), seeing relatable peers achieving tangible results lowers perceived risk and creates identity alignment — which can be more persuasive than polished brand imagery for an audience skeptical of over-produced marketing.

**What we expect to learn:**
We will determine whether relatability and community validation are stronger conversion drivers than the premium brand positioning of the control. If it fails, it suggests our audience primarily seeks an aspirational escape rather than peer validation — which would guide us toward doubling down on brand prestige in future iterations.

---

## 4. Summary Table

| Variant | Methodology | CTA Copy | Layout Style | Primary Lever |
|---|---|---|---|---|
| `/control` | Aesthetic Halo Effect | "Start Your Journey" | Long-form, editorial | Brand trust + education |
| `/variant-1` | Scarcity + FOMO | "Claim Your Invite" | Short-form, urgent | Limited availability |
| `/variant-2` | Social Proof | "Join the Community" | Grid-based, UGC-forward | Peer validation |
