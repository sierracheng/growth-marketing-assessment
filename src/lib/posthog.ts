import posthog from 'posthog-js'

// Init at module level — same pattern as the official PostHog Next.js playground.
// The typeof window guard prevents SSR execution.
if (typeof window !== 'undefined') {
  const auraVid = document.cookie
    .split('; ')
    .find((c) => c.startsWith('aura_vid='))
    ?.split('=')[1]

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
    api_host: '/ingest',
    ui_host: 'https://us.posthog.com',
    person_profiles: 'always',
    capture_pageview: false,
    capture_pageleave: true,
    advanced_disable_feature_flags: true,
    debug: true,
    ...(auraVid ? { bootstrap: { distinctID: auraVid } } : {}),
  })
}

export default posthog

export function captureSignup(variantId: string, referralCode: string) {
  posthog.capture('signed_up', {
    variant: variantId,
    referral_code: referralCode,
    $set_once: { first_variant_seen: variantId },
  })
}
