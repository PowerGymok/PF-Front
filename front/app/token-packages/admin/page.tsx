"use client";

import TokenPackageForm from "@/features/token-packages/components/TokenPackageForm";
import TokenPackageAdminPage from "@/features/token-packages/pages/TokenPackageAdminPage";

export default function AdminTokenPackagesPage() {
  return (
    <main>
      <TokenPackageForm />
      <TokenPackageAdminPage />
    </main>
  );
}
