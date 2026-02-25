"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { GetAdminMemberships } from "@/features/memberships/services/membership.service";
import { MembershipAdminResponse } from "@/features/memberships/validators/membershipSchema";
import MembershipAdminCard from "@/features/memberships/pages/GetAllMembership";

export default function AdminMembershipsPage() {
  const { dataUser } = useAuth();
  const [memberships, setMemberships] = useState<MembershipAdminResponse[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading",
  );
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token = dataUser?.token;
    if (!token) {
      setStatus("error");
      setErrorMsg("No hay sesión activa.");
      return;
    }

    GetAdminMemberships(token)
      .then((data) => {
        setMemberships(data);
        setStatus("success");
      })
      .catch((err) => {
        setErrorMsg(err.message);
        setStatus("error");
      });
  }, [dataUser]);

  const handleDeleted = (id: string) => {
    setMemberships((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <main
      style={{
        maxWidth: 960,
        margin: "2rem auto",
        padding: "1.5rem",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.5rem" }}
      >
        Membresías — Admin
      </h1>

      {status === "loading" && <p style={{ color: "#888" }}>Cargando...</p>}

      {status === "error" && <p style={{ color: "red" }}>{errorMsg}</p>}

      {status === "success" &&
        (memberships.length === 0 ? (
          <p style={{ color: "#888" }}>No hay membresías registradas.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {memberships.map((membership) => (
              <MembershipAdminCard
                key={membership.id}
                membership={membership}
                onDeleted={handleDeleted}
              />
            ))}
          </div>
        ))}
    </main>
  );
}
