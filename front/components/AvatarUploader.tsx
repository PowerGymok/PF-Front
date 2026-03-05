"use client";

import { useRef, useState } from "react";

interface Props {
  token: string;
  image?: string;
}

export default function AvatarUploader({ token, image }: Props) {
  const [preview, setPreview] = useState<string | undefined>(image);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // VALIDACIÓN FORMATO
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert("Solo se permiten imágenes JPG, PNG o WEBP");
      return;
    }

    // VALIDACIÓN TAMAÑO
    const maxSize = 1024 * 1024;

    if (file.size > maxSize) {
      alert("La imagen debe ser menor a 1MB");
      return;
    }

    // preview inmediato
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:3000/files/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      setPreview(data.profileImg);
    } catch (error) {
      console.error("Error subiendo imagen", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={preview || "/default-avatar.png"}
        alt="avatar"
        width={120}
        height={120}
        style={{
          borderRadius: "50%",
          cursor: "pointer",
          objectFit: "cover",
        }}
        onClick={() => fileInputRef.current?.click()}
      />

      <p style={{ fontSize: "14px" }}>Click en la imagen para cambiar</p>

      <input
        type="file"
        accept="image/jpeg, image/png, image/webp"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFile}
      />
    </div>
  );
}
