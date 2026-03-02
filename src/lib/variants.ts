export type VariantId = "control" | "variant-1" | "variant-2";

export const SIGNUP_BASE_URL = "https://ads.axon.ai/auth/signup";

export interface HeroConfig {
  badge?: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  bgType: "video" | "image" | "solid";
  bgSrc?: string;
  bgPoster?: string;
  overlay?: boolean;
  showSpotCounter?: boolean;
  spotsLeft?: number;
  spotsTotal?: number;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesConfig {
  sectionLabel: string;
  headline: string;
  subheadline?: string;
  items: FeatureItem[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export interface SocialProofConfig {
  stats: Stat[];
  testimonials: Testimonial[];
}

export interface CTASectionConfig {
  headline: string;
  subheadline: string;
  ctaLabel: string;
}

export interface VariantConfig {
  id: VariantId;
  referralCode: string;
  navCtaLabel: string;
  hero: HeroConfig;
  features: FeaturesConfig;
  socialProof: SocialProofConfig;
  ctaSection: CTASectionConfig;
}

const SHARED_FEATURES: FeatureItem[] = [
  {
    icon: "✦",
    title: "Movement Library",
    description:
      "500+ guided yoga, pilates, and flow sessions from world-class instructors from 10-minute resets to 90-minute deep practices.",
  },
  {
    icon: "◎",
    title: "Breathwork & Meditation",
    description:
      "Daily breathwork rituals and guided meditations designed to regulate your nervous system and anchor you in calm.",
  },
  {
    icon: "⬡",
    title: "Live Sessions",
    description:
      "Join real-time classes and connect with instructors who know your name. Accountability that feels personal, not algorithmic.",
  },
  {
    icon: "◇",
    title: "Wellness Journal",
    description:
      "Capture your progress, moods, and milestones. Your private space to reflect, set intentions, and celebrate growth.",
  },
];

const SHARED_STATS: Stat[] = [
  { value: "10,000+", label: "active members" },
  { value: "500+", label: "guided sessions" },
  { value: "4.9/5", label: "average rating" },
  { value: "94%", label: "feel less stressed in 30 days" },
];

const SHARED_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I've tried every wellness app out there. Aura actually makes me want to show up every morning. The instructors feel like real people who care.",
    name: "Emma R.",
    role: "Yoga Teacher, London",
    initials: "ER",
  },
  {
    quote:
      "The live sessions changed everything. Having instructors who remember my name keeps me accountable in a way no on-demand library ever could.",
    name: "James T.",
    role: "Creative Director, NYC",
    initials: "JT",
  },
  {
    quote:
      "I cancelled my gym membership the day I joined Aura. It gives me more than any studio could, and I practise in my living room at 6am.",
    name: "Sophia L.",
    role: "Mother of three, Melbourne",
    initials: "SL",
  },
];

export const VARIANTS: Record<VariantId, VariantConfig> = {
  control: {
    id: "control",
    referralCode: "AURA-BRAND-CTRL",
    navCtaLabel: "Start Your Journey",
    hero: {
      headline: "Reclaim Your Calm",
      subheadline:
        "Studio-grade movement, mindfulness practices, and organic living all in one place. Built for the modern pace of life.",
      ctaLabel: "Start Your Journey",
      bgType: "video",
      bgSrc:
        "https://assets.mixkit.co/videos/48525/48525-720.mp4",
      bgPoster:
        "https://assets.mixkit.co/videos/48525/48525-thumb-720-0.jpg",
      overlay: true,
    },
    features: {
      sectionLabel: "Your Practice",
      headline: "Your Complete Wellness Practice",
      subheadline:
        "Everything you need to move, breathe, and live well curated by experts who have devoted their lives to it.",
      items: SHARED_FEATURES,
    },
    socialProof: {
      stats: SHARED_STATS,
      testimonials: SHARED_TESTIMONIALS,
    },
    ctaSection: {
      headline: "Your Practice Begins Today",
      subheadline:
        "Seven days, free. No credit card required. Cancel whenever you like.",
      ctaLabel: "Start Your Journey",
    },
  },

  "variant-1": {
    id: "variant-1",
    referralCode: "AURA-FOUNDING-V1",
    navCtaLabel: "Claim Your Invite",
    hero: {
      badge: "Founding Member Invitation",
      headline: "You've Been Selected to Join Aura",
      subheadline:
        "Lock in founding member pricing forever. Only 127 spots remain before the program closes.",
      ctaLabel: "Claim Your Founding Spot",
      bgType: "image",
      bgSrc:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80",
      overlay: true,
      showSpotCounter: true,
      spotsLeft: 127,
      spotsTotal: 200,
    },
    features: {
      sectionLabel: "What's Included",
      headline: "Everything in Your Founding Membership",
      items: [
        {
          icon: "✦",
          title: "Full Movement Library",
          description:
            "500+ guided sessions including yoga, pilates, breathwork, and meditation. New content added weekly.",
        },
        {
          icon: "◎",
          title: "Live Weekly Sessions",
          description:
            "Real-time classes with instructors who know your name. Founding members get priority booking.",
        },
        {
          icon: "⬡",
          title: "Founding Member Circle",
          description:
            "Lifetime access to an exclusive accountability pod with the first 200 members who built this community.",
        },
        {
          icon: "◇",
          title: "Personal Intake Call",
          description:
            "One-on-one wellness intake with a lead instructor to build a practice tailored to your life.",
        },
      ],
    },
    socialProof: {
      stats: SHARED_STATS,
      testimonials: SHARED_TESTIMONIALS,
    },
    ctaSection: {
      headline: "127 Spots. Then the Door Closes.",
      subheadline:
        "Founding pricing is $19/month, locked in for life. Once these spots are gone, this offer disappears permanently.",
      ctaLabel: "Claim Your Founding Spot",
    },
  },

  "variant-2": {
    id: "variant-2",
    referralCode: "AURA-COMMUNITY-V2",
    navCtaLabel: "Join the Community",
    hero: {
      badge: "10,000 Members & Growing",
      headline: "Join 10,000+ Members Already Thriving",
      subheadline:
        "Real people. Real results. A community that keeps you accountable, supported, and coming back.",
      ctaLabel: "Join the Community",
      bgType: "solid",
    },
    features: {
      sectionLabel: "What You'll Get",
      headline: "Built Around Real People, Not Perfect Ones",
      subheadline:
        "Every tool, session, and ritual is designed for the life you actually have, not the one you wish you had.",
      items: SHARED_FEATURES,
    },
    socialProof: {
      stats: [
        { value: "10,000+", label: "active members" },
        { value: "41", label: "countries represented" },
        { value: "2.3M", label: "sessions completed" },
        { value: "94%", label: "feel less stressed in 30 days" },
      ],
      testimonials: [
        {
          quote:
            "I was skeptical. I'd quit every app before. But seeing real members in the community grid made me feel like I could actually belong here.",
          name: "Mia K.",
          role: "Nurse, Chicago",
          initials: "MK",
        },
        {
          quote:
            "The community circles are everything. I have a pod of five people who notice when I go quiet. That accountability changed my whole relationship with movement.",
          name: "Daniel O.",
          role: "Teacher, Cape Town",
          initials: "DO",
        },
        {
          quote:
            "It doesn't feel like a wellness app. It feels like a group chat where everyone genuinely wants you to show up.",
          name: "Priya S.",
          role: "Architect, Singapore",
          initials: "PS",
        },
      ],
    },
    ctaSection: {
      headline: "Your Community Is Already Here",
      subheadline:
        "Join free for 7 days. No pressure, no credit card. Just people who show up for each other.",
      ctaLabel: "Join the Community",
    },
  },
};

export function getSignupUrl(referralCode: string): string {
  return `${SIGNUP_BASE_URL}?referralCode=${referralCode}`;
}
