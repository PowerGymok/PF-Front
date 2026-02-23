import clsx from "clsx";
import { Feature, FeatureIconType } from "./types/membership.types";

import { Workshop_Icon } from "@/components/icons/Workshop_Icon";
import { Token_Icon } from "@/components/icons/Token_Icon";
import { Shower_Icon } from "@/components/icons/Shower_Icon";
import { Chat_Icon } from "@/components/icons/Chat_Icon";

interface FeatureItemProps {
  feature: Feature;
  hoverTextStyle: string;
}

const iconMap: Record<FeatureIconType, React.ElementType> = {
  workshop: Workshop_Icon,
  token: Token_Icon,
  shower: Shower_Icon,
  chat: Chat_Icon,
};

export function FeatureItem({ feature, hoverTextStyle }: FeatureItemProps) {
  const IconComponent = iconMap[feature.icon];

  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <div className={clsx("transition-colors duration-300", hoverTextStyle)}>
        <IconComponent className="w-10 h-10" />
      </div>

      <span
        className={clsx(
          "text-xs uppercase tracking-wide leading-snug max-w-30 transition-colors duration-300",
          hoverTextStyle,
        )}
      >
        {feature.text}
      </span>
    </div>
  );
}
