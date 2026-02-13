import { PricingCardComponent } from "@/components/PricingCardComponent";
import { ChatIcon } from "@/components/icons/ChatIcon";
import { ShowerIcon } from "@/components/icons/ShowerIcon";
import { TokenIcon } from "@/components/icons/TokenIcon";
import { WorkshopIcon } from "@/components/icons/WorkshopIcon";
import { PricingCardProps } from "@/components/PricingCardComponent";

export default function Memberships() {
  const plans: PricingCardProps[] = [
    {
      title: "FIRST TIME",
      price: "20 USD",
      membershipVariant: "firstTime",
      features: [
        {
          icon: <WorkshopIcon className="w-10 h-10" />,
          text: "AGENDA TU CLASE (SEGUN CUPO)",
        },
        {
          icon: <TokenIcon className="w-10 h-10" />,
          text: "X2 TOKENS",
        },
        {
          icon: <ShowerIcon className="w-10 h-10" />,
          text: "ACCESO A REGADERAS",
        },
        {
          icon: <ChatIcon className="w-10 h-10" />,
          text: "ATENCION PERSONALIZADA",
          premiumOnly: true,
        },
      ],
    },
    {
      title: "BRONZE",
      price: "50 USD",
      membershipVariant: "bronze",
      features: [
        {
          icon: <WorkshopIcon className="w-10 h-10" />,
          text: "AGENDA TU CLASE (SEGUN CUPO)",
        },
        {
          icon: <TokenIcon className="w-10 h-10" />,
          text: "X4 TOKENS",
        },
        {
          icon: <ShowerIcon className="w-10 h-10" />,
          text: "ACCESO REGADERAS",
        },
        {
          icon: <ChatIcon className="w-10 h-10" />,
          text: "ATENCION PERSONALIZADA",
          premiumOnly: true,
        },
      ],
    },
    {
      title: "SILVER",
      price: "100 USD",
      membershipVariant: "silver",
      features: [
        {
          icon: <WorkshopIcon className="w-10 h-10" />,
          text: "AGENDA TU CLASE (SEGUN CUPO)",
        },
        {
          icon: <TokenIcon className="w-10 h-10" />,
          text: "X8 TOKENS",
        },
        {
          icon: <ShowerIcon className="w-10 h-10" />,
          text: "ACCESO A REGADERAS",
        },
        {
          icon: <ChatIcon className="w-10 h-10" />,
          text: "ATENCION PERSONALIZADA",
          premiumOnly: true,
        },
      ],
    },
    {
      title: "GOLD",
      price: "140 USD",
      membershipVariant: "gold",
      features: [
        {
          icon: <WorkshopIcon className="w-10 h-10" />,
          text: "AGENDA TU CLASE 3 DIAS ANTES",
        },
        {
          icon: <TokenIcon className="w-10 h-10" />,
          text: "16 TOKENS",
        },
        {
          icon: <ShowerIcon className="w-10 h-10" />,
          text: "ACCESO A LOCKER & REGADERAS",
        },
        {
          icon: <ChatIcon className="w-10 h-10" />,
          text: "ATENCION PERSONALIZADA",
          premiumOnly: true,
        },
      ],
    },
    {
      title: "UNLIMITED",
      price: "160 USD / mes ",
      membershipVariant: "unlimited",
      features: [
        {
          icon: <WorkshopIcon className="w-10 h-10" />,
          text: "AGENDA TU CLASE 3 DIAS ANTES",
        },
        {
          icon: <TokenIcon className="w-10 h-10" />,
          text: "SIN LIMITE X MES",
        },
        {
          icon: <ShowerIcon className="w-10 h-10" />,
          text: "ACCESO A LOCKER & REGADERAS",
        },
        {
          icon: <ChatIcon className="w-10 h-10" />,
          text: "ATENCION PERSONALIZADA",
          premiumOnly: true,
        },
      ],
    },
    {
      title: "TOKEN",
      price: "16 USD",
      membershipVariant: "singleToken",
      features: [
        {
          icon: <WorkshopIcon className="w-10 h-10" />,
          text: "AGENDA TU CLASE (SEGUN CUPO)",
        },
        {
          icon: <TokenIcon className="w-10 h-10" />,
          text: "X1 TOKENS",
        },
        {
          icon: <ShowerIcon className="w-10 h-10" />,
          text: "ACCESO REGADERAS",
        },
        {
          icon: <ChatIcon className="w-10 h-10" />,
          text: "ATENCION PERSONALIZADA",
          premiumOnly: true,
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-black py-20 px-6">
      <div className="grid gap-10 md:grid-cols-3 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <PricingCardComponent key={index} {...plan} />
        ))}
      </div>
    </main>
  );
}
