import { Membership } from "./types/membership.types";

export const memberships: Membership[] = [
  {
    title: "BRONZE",
    price: "40 USD",
    membershipVariant: "bronze",
    features: [
      {
        icon: "workshop",
        text: "Agenda tu clase",
      },
      {
        icon: "token",
        text: "Incluye CUATRO TOKENS",
      },
      {
        icon: "chat",
        text: "Seguimiento Coach",
      },
      {
        icon: "shower",
        text: "Acceso a regaderas",
      },
    ],
  },
  {
    title: "SILVER",
    price: "80 USD",
    membershipVariant: "silver",
    features: [
      {
        icon: "workshop",
        text: "Agenda tu clase",
      },
      {
        icon: "token",
        text: "Incluye OCHO TOKENS",
      },
      {
        icon: "chat",
        text: "Seguimiento Coach",
      },
      {
        icon: "shower",
        text: "Acceso a regaderas",
      },
    ],
  },
  {
    title: "GOLD",
    price: "160 USD",
    membershipVariant: "gold",
    features: [
      {
        icon: "workshop",
        text: "Agenda tu clase",
      },
      {
        icon: "token",
        text: "Incluye DIECISÉIS TOKENS",
      },
      {
        icon: "chat",
        text: "Seguimiento Coach",
      },
      {
        icon: "shower",
        text: "Acceso a regaderas",
      },
    ],
  },
  {
    title: "SINGLE TOKEN",
    price: "10 USD",
    membershipVariant: "single",
    features: [
      {
        icon: "workshop",
        text: "Agenda tu clase",
      },
      {
        icon: "token",
        text: "Recarga TOKEN individual",
      },
      {
        icon: "chat",
        text: "Seguimiento Coach",
      },
      {
        icon: "shower",
        text: "Acceso a regaderas",
      },
    ],
  },
];
