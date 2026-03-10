"use client";

import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import CreateClassModal from "@/features/booking/components/CreateClassModal";

export default function WorkoutsToolbar() {
  const { dataUser } = useAuth();
  const role = dataUser?.user?.role as string | undefined;
  const isAdminOrCoach = role === "Admin" || role === "Coach";

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  if (!isAdminOrCoach) return null;

  const handleSuccess = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="flex items-center gap-3">
        {/* Nueva clase */}
        <button
          onClick={() => setIsCreateOpen(true)}
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
          Nueva clase
        </button>
      </div>

      <CreateClassModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={handleSuccess}
        authToken={dataUser?.token ?? ""}
      />
    </>
  );
}
