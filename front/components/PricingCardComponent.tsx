"use client";

import React from "react";
import { useRouter } from "next/navigation";

type MembershipVariant =
  | "bronze"
  | "silver"
  | "gold"
  | "unlimited"
  | "firstTime"
  | "singleToken";

export interface PricingCardProps {
  title: string;
  price: string;
  features: {
    icon: React.ReactNode;
    text: string;
    premiumOnly?: boolean;
  }[];
  membershipVariant: MembershipVariant;
  highlighted?: boolean;
}

const variantStyles: Record<
  MembershipVariant,
  {
    border: string;
    hoverBorder: string;
    hoverText: string;
  }
> = {
  bronze: {
    border: "border-white/30",
    hoverBorder: "group-hover:border-amber-500",
    hoverText: "group-hover:text-amber-500",
  },
  silver: {
    border: "border-white/30",
    hoverBorder: "group-hover:border-zinc-600",
    hoverText: "group-hover:text-zinc-600",
  },
  gold: {
    border: "border-white/30",
    hoverBorder: "group-hover:border-yellow-400",
    hoverText: "group-hover:text-yellow-400",
  },
  unlimited: {
    border: "border-white/30",
    hoverBorder: "group-hover:border-rose-600",
    hoverText: "group-hover:text-rose-600",
  },
  firstTime: {
    border: "border-white/30",
    hoverBorder: "group-hover:border-green-400",
    hoverText: "group-hover:text-green-400",
  },
  singleToken: {
    border: "border-white/30",
    hoverBorder: "group-hover:border-green-400",
    hoverText: "group-hover:text-green-400",
  },
};

export function PricingCardComponent({
  title,
  price,
  features,
  membershipVariant,
  highlighted = false,
}: PricingCardProps) {
  const router = useRouter();
  const styles = variantStyles[membershipVariant];

  return (
    <div
      className={`
        group
        relative
        flex
        flex-col
        justify-between
        min-h-64
        border
        ${styles.border}
        ${styles.hoverBorder}
        rounded-3xl
        p-10
        text-white
        bg-black
        transition-all
        duration-300
        hover:scale-105
        ${highlighted ? "shadow-2xl shadow-white/10" : ""}
      `}
    >
      {/* TOP SECTION */}
      <div className="space-y-6">
        {/* TITLE */}
        <div className="text-center space-y-3">
          <h2
            className={`
              text-4xl
              font-extrabold
              tracking-wide
              transition-colors
              duration-300
              ${styles.hoverText}
            `}
          >
            {title}
          </h2>
        </div>

        {/* FEATURES */}
        <div className="mt-10 flex justify-center">
          <div className="grid grid-cols-2 gap-y-10 gap-x-12 max-w-md">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-3"
              >
                <div
                  className={`
                    transition-colors
                    duration-300
                    ${styles.hoverText}
                  `}
                >
                  {feature.icon}
                </div>

                <span
                  className={`
    text-xs
    uppercase
    tracking-wide
    leading-snug
    wrap-break-wordbreak-words
    max-w-30
    ${
      feature.premiumOnly &&
      membershipVariant !== "gold" &&
      membershipVariant !== "unlimited"
        ? "line-through opacity-40"
        : ""
    }
  `}
                >
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* END TOP SECTION */}

      {/* BOTTOM SECTION */}
      <div className="mt-12 text-center space-y-6">
        {/* PRICE */}
        <p
          className={`
            text-3xl
            font-extrabold
            tracking-wide
            transition-colors
            duration-300
            ${styles.hoverText}
          `}
        >
          {price}
        </p>

        {/* BUTTON */}
        <button
          onClick={() => router.push(`/register?plan=${membershipVariant}`)}
          className="
    w-full
    py-4
    rounded-full
    border
    border-white
    font-semibold
    tracking-wide
    transition-all
    duration-300
    hover:bg-white
    hover:text-black
  "
        >
          ¡INSCRÍBETE AHORA!
        </button>
      </div>
    </div>
  );
}
