"use client";

import { useEffect, useState } from "react";

const ACTIVITIES = [
  { name: "Sofia M.", location: "Miami", ago: "2 minutes ago" },
  { name: "Priya S.", location: "Singapore", ago: "4 minutes ago" },
  { name: "Emma R.", location: "London", ago: "7 minutes ago" },
  { name: "Mia K.", location: "Chicago", ago: "11 minutes ago" },
  { name: "Lucia P.", location: "Barcelona", ago: "15 minutes ago" },
  { name: "Yuki T.", location: "Tokyo", ago: "18 minutes ago" },
  { name: "Amara N.", location: "Lagos", ago: "22 minutes ago" },
  { name: "Hana W.", location: "Seoul", ago: "26 minutes ago" },
];

export default function LiveActivity() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % ACTIVITIES.length);
        setVisible(true);
      }, 350);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const activity = ACTIVITIES[index];

  return (
    <div className="bg-cream border-y border-cream-border py-3.5 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
        {/* Pulsing live dot */}
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
        </span>

        {/* Activity message */}
        <p
          className="text-xs text-warm-gray tracking-wide"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <span className="text-charcoal font-medium">{activity.name}</span>
          {" "}from {activity.location} just claimed a founding spot
          <span className="text-warm-gray-light ml-2">· {activity.ago}</span>
        </p>
      </div>
    </div>
  );
}
