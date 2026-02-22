import { PricingCardComponent } from "@/components/PricingCardComponent";
import { Chat_Icon } from "@/components/icons/Chat_Icon";
import { Shower_Icon } from "@/components/icons/Shower_Icon";
import { Token_Icon } from "@/components/icons/Token_Icon";
import { Workshop_Icon } from "@/components/icons/Workshop_Icon";
import { PricingCardProps } from "@/components/PricingCardComponent";

export default function Memberships() {
  const plans: PricingCardProps[] = [
    {
      title: "FIRST TIME",
      price: "20 USD",
      membershipVariant: "firstTime",
      features: [
        {
          icon: <Workshop_Icon className="w-10 h-10" />,
          text: "AGENDA TU CLASE (SEGUN CUPO)",
        },
        {
          icon: <Token_Icon className="w-10 h-10" />,
          text: "X2 TOKENS",
        },
        {
          icon: <Shower_Icon className="w-10 h-10" />,
          text: "ACCESO A REGADERAS",
        },
        {
          icon: <Chat_Icon className="w-10 h-10" />,
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
          icon: <Workshop_Icon className="w-10 h-10" />,
          text: "AGENDA TU CLASE (SEGUN CUPO)",
        },
        {
          icon: <Token_Icon className="w-10 h-10" />,
          text: "X4 TOKENS",
        },
        {
          icon: <Shower_Icon className="w-10 h-10" />,
          text: "ACCESO REGADERAS",
        },
        {
          icon: <Chat_Icon className="w-10 h-10" />,
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
          icon: <Workshop_Icon className="w-10 h-10" />,
          text: "AGENDA TU CLASE (SEGUN CUPO)",
        },
        {
          icon: <Token_Icon className="w-10 h-10" />,
          text: "X8 TOKENS",
        },
        {
          icon: <Shower_Icon className="w-10 h-10" />,
          text: "ACCESO A REGADERAS",
        },
        {
          icon: <Chat_Icon className="w-10 h-10" />,
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
          icon: <Workshop_Icon className="w-10 h-10" />,
          text: "AGENDA TU CLASE 3 DIAS ANTES",
        },
        {
          icon: <Token_Icon className="w-10 h-10" />,
          text: "16 TOKENS",
        },
        {
          icon: <Shower_Icon className="w-10 h-10" />,
          text: "ACCESO A LOCKER & REGADERAS",
        },
        {
          icon: <Chat_Icon className="w-10 h-10" />,
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
          icon: <Workshop_Icon className="w-10 h-10" />,
          text: "AGENDA TU CLASE 3 DIAS ANTES",
        },
        {
          icon: <Token_Icon className="w-10 h-10" />,
          text: "SIN LIMITE X MES",
        },
        {
          icon: <Shower_Icon className="w-10 h-10" />,
          text: "ACCESO A LOCKER & REGADERAS",
        },
        {
          icon: <Chat_Icon className="w-10 h-10" />,
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
          icon: <Workshop_Icon className="w-10 h-10" />,
          text: "AGENDA TU CLASE (SEGUN CUPO)",
        },
        {
          icon: <Token_Icon className="w-10 h-10" />,
          text: "X1 TOKENS",
        },
        {
          icon: <Shower_Icon className="w-10 h-10" />,
          text: "ACCESO REGADERAS",
        },
        {
          icon: <Chat_Icon className="w-10 h-10" />,
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
