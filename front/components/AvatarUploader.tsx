"use client";

import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";

interface Props {
  token: string;
}

export default function AvatarUploader({ token }: Props) {

  const { dataUser, updateProfileImg } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {

    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {

      setLoading(true);

      const res = await fetch("http://localhost:3030/files/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      console.log("UPLOAD RESPONSE", data);

      if (data.profileImg) {
        updateProfileImg(data.profileImg);
      }

    } catch (error) {

      console.error("Upload error", error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="flex flex-col items-center">

      <img
        src={`${dataUser?.user?.profileImg}?t=${Date.now()}`}
        alt="avatar"
        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
      />

      <label className="mt-2 cursor-pointer text-sm text-blue-600 hover:underline">

        {loading ? "Subiendo..." : "Cambiar foto"}

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />

      </label>

    </div>
  );
}