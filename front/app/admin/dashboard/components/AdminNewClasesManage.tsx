"use client";

import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { createClass } from "@/services/clases.services";
import { Dumbbell } from "lucide-react";

export default function AdminNewClass() {

const { dataUser } = useAuth();

const [title,setTitle] = useState("");
const [description,setDescription] = useState("");
const [duration,setDuration] = useState(60);
const [capacity,setCapacity] = useState(10);
const [intensity,setIntensity] = useState<"baja" | "media" | "alta">("media");

const [loading,setLoading] = useState(false);

const handleSubmit = async (e:React.FormEvent) => {


e.preventDefault();

if(!dataUser?.token) return;

try{

  setLoading(true);

  await createClass(dataUser.token,{
    name:title,
    description,
    duration: duration.toString(),
    capacity,
    intensity
  });

  alert("Clase creada correctamente");

  setTitle("");
  setDescription("");
  setDuration(60);
  setCapacity(10);
  setIntensity("media");

}catch(error:any){

  console.error(error.message);
  alert("Error creando clase");

}finally{

  setLoading(false);

}


};

return(


<div className="mt-10 bg-white p-8 rounded-2xl shadow-lg border max-w-3xl">

  <div className="flex items-center gap-3 mb-8">

    <Dumbbell className="text-blue-600" size={28}/>

    <h1 className="text-3xl font-bold text-gray-800">
      Crear nueva clase
    </h1>

  </div>

  <form
    onSubmit={handleSubmit}
    className="grid gap-6"
  >

    <div>

      <label className="text-sm text-gray-600">
        Nombre de la clase
      </label>

      <input
        type="text"
        required
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        className="border p-2 rounded w-full text-black"
      />

    </div>

    <div>

      <label className="text-sm text-gray-600">
        Descripción
      </label>

      <textarea
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        className="border p-2 rounded w-full text-black"
      />

    </div>

    <div className="grid grid-cols-3 gap-4">

      <div>

        <label className="text-sm text-gray-600">
          Duración (min)
        </label>

        <input
          type="number"
          value={duration}
          onChange={(e)=>setDuration(Number(e.target.value))}
          className="border p-2 rounded w-full text-black"
        />

      </div>

      <div>

        <label className="text-sm text-gray-600">
          Capacidad
        </label>

        <input
          type="number"
          value={capacity}
          onChange={(e)=>setCapacity(Number(e.target.value))}
          className="border p-2 rounded w-full text-black"
        />

      </div>

      <div>

        <label className="text-sm text-gray-600">
          Intensidad
        </label>

        <select
          value={intensity}
          onChange={(e)=>setIntensity(e.target.value as "baja" | "media" | "alta")}
          className="border p-2 rounded w-full text-black"
        >
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>

      </div>

    </div>

    <button
      type="submit"
      disabled={loading}
      className="bg-blue-600 text-white py-3 rounded-lg"
    >
      {loading ? "Creando..." : "Crear clase"}
    </button>

  </form>

</div>


);

}
