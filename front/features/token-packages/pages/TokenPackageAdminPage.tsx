"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { GetAdminTokenPackages } from "@/features/token-packages/services/tokenPackageService";
import { TokenPackageAdminResponse } from "@/features/token-packages/validators/Tokenpackageschema";
import TokenPackageAdminCard from "@/features/token-packages/components/TokenPackageAdminCard";

export default function TokenPackageAdminPage() {
  const { dataUser } = useAuth();
  const [packages, setPackages] = useState<TokenPackageAdminResponse[]>([]);
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

    GetAdminTokenPackages(token)
      .then((data) => {
        setPackages(data);
        setStatus("success");
      })
      .catch((err) => {
        setErrorMsg(err.message);
        setStatus("error");
      });
  }, [dataUser]);

  const handleDeleted = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
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
        Paquetes de tokens — Admin
      </h1>

      {status === "loading" && <p style={{ color: "#888" }}>Cargando...</p>}
      {status === "error" && <p style={{ color: "red" }}>{errorMsg}</p>}

      {status === "success" &&
        (packages.length === 0 ? (
          <p style={{ color: "#888" }}>No hay paquetes registrados.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {packages.map((pkg) => (
              <TokenPackageAdminCard
                key={pkg.id}
                tokenPackage={pkg}
                onDeleted={handleDeleted}
              />
            ))}
          </div>
        ))}
    </main>
  );
}
