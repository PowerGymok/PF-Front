"use client";
import { useState } from "react";

type MembershipType = "none" | "free" | "basic" | "premium";

export default function MembershipTester({
  onChange,
}: {
  onChange: (membership: { type: MembershipType; isActive: boolean } | null) => void;
}) {
  const [selected, setSelected] = useState<MembershipType>("none");

  const handleChange = (value: MembershipType) => {
    setSelected(value);

    if (value === "none") {
      onChange(null);
      return;
    }

    onChange({
      type: value,
      isActive: true,
    });
  };

  return (
    <div className="p-4 border rounded-md mb-4">
      <h2 className="font-bold mb-2">Simulador de Membresía</h2>

      <select
        value={selected}
        onChange={(e) => handleChange(e.target.value as MembershipType)}
        className="border p-2 rounded-md"
      >
        <option value="none">Sin membresía</option>
        <option value="free">Free</option>
        <option value="basic">Basic</option>
        <option value="premium">Premium</option>
      </select>
    </div>
  );
}