"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

export default function MembershipsToolbar() {
  const { dataUser } = useAuth();
  const router = useRouter();
  const role = dataUser?.user?.role as string | undefined;
  const isAdmin = role === "Admin";

  if (!isAdmin) return null;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => router.push("/memberships")}
        className="flex items-center gap-2 border border-white/20 text-white/70 text-sm font-semibold px-5 py-2.5 rounded-xl hover:border-white hover:text-white active:scale-[.98] transition-all"
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 2.5C4 2.5 1.5 7 1.5 7S4 11.5 7 11.5 12.5 7 12.5 7 10 2.5 7 2.5Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle
            cx="7"
            cy="7"
            r="1.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
        Vista pública
      </button>

      {/* Nueva membresía */}
      <button
        onClick={() => router.push("/admin/dashboard/memberships/create")}
        className="flex items-center gap-2 border border-white/20 text-white/70 text-sm font-semibold px-5 py-2.5 rounded-xl hover:border-white hover:text-white active:scale-[.98] transition-all"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path
            d="M6.5 1v11M1 6.5h11"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        Nueva membresía
      </button>
    </div>
  );
}
