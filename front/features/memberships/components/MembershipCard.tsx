"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { variantStyles } from "@/features/memberships/styles/membership.styles";
import { FeatureItem } from "@/features/memberships/components/FeatureItem";
import { Membership } from "@/features/memberships/types/membership.types";

export function MembershipCard({
  title,
  price,
  features,
  membershipVariant,
}: Membership) {
  const router = useRouter();
  const styles = variantStyles[membershipVariant];

  const handleRegister = () => {
    router.push(`/register?plan=${membershipVariant}`);
  };

  return (
    <div
      className={clsx(
        "group relative flex flex-col justify-between ",
        "w-full max-w-sm mx-auto",
        "border-2 rounded-3xl p-5 text-white bg-black",
        "transition-all duration-300 hover:scale-105  hover:shadow-2xl",
        styles.border,
        styles.hoverBorder,
      )}
    >
      {/* Título */}
      <div className="text-center space-y-3">
        <h2
          className={clsx(
            "text-4xl font-extrabold transition-colors duration-300",
            styles.hoverText,
          )}
        >
          {title}
        </h2>
      </div>

      {/* Features */}
      <div className="mt-10 flex justify-center">
        <div className="grid grid-cols-2 gap-y-10 gap-x-10 max-w-md">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              feature={feature}
              hoverTextStyle={styles.hoverText}
            />
          ))}
        </div>
      </div>

      {/* Precio + Botón */}
      <div className="mt-7.5 text-center space-y-5">
        <p
          className={clsx(
            "text-3xl font-extrabold transition-colors duration-300",
            styles.hoverText,
          )}
        >
          {price}
        </p>

        <button
          onClick={handleRegister}
          className="w-full py-3 rounded-full border border-white font-semibold hover:bg-white hover:text-black transition-all duration-300"
        >
          ¡INSCRÍBETE AHORA!
        </button>
      </div>
    </div>
  );
}
