'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import posthog from '@/lib/posthog'

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    posthog.capture('$pageview')
  }, [pathname])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
