"use client";

import { useEffect,useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { getClasses } from "@/services/clases.services";
import { createSchedule } from "../../../../services/clases.services";

interface ClassInterface{

id: string;
name: string;

}

export default function CreateSchedule(){

const { dataUser } = useAuth();

const [classes,setClasses] = useState<ClassInterface[]>([]);
const [classId,setClassId] = useState("");

const [date,setDate] = useState("");
const [time,setTime] = useState("");
const [tokens, setTokens] = useState(1);

const [loading,setLoading] = useState(false);

useEffect(()=>{

const fetchClasses = async()=>{

  if(!dataUser?.token) return;

  const data = await getClasses(dataUser.token);

  setClasses(data);

};

fetchClasses();

},[dataUser?.token]);

const handleSubmit = async (e: React.FormEvent) => {

e.preventDefault();

if(!dataUser?.token) return;

try{

  setLoading(true);

  await createSchedule(
    dataUser.token,
    classId,
    {
      date,
      time,
      token: tokens,
    }
  );

  alert("Horario creado correctamente");

  setDate("");
  setTime("");

}catch(error:any){

  console.error(error.message);
  alert("Error creando horario");

}finally{

  setLoading(false);

}
}

return(

<div className="bg-white p-8 rounded-xl shadow max-w-xl">

  <h2 className="text-xl font-bold mb-6">
    Crear horario de clase
  </h2>

  <form
    onSubmit={handleSubmit}
    className="grid gap-4"
  >

    <select
      value={classId}
      onChange={(e)=>setClassId(e.target.value)}
      required
      className="border p-2 rounded text-black"
    >

      <option value="">
        Seleccionar clase
      </option>

      {classes.map((c)=>(
        <option
          key={c.id}
          value={c.id}
        >
          {c.name}
        </option>
      ))}

    </select>

    <input
      type="date"
      value={date}
      onChange={(e)=>setDate(e.target.value)}
      required
      className="border p-2 rounded text-black"
    />

    <input
      type="time"
      value={time}
      onChange={(e)=>setTime(e.target.value)}
      required
      className="border p-2 rounded text-black"
    />

    <input
      type="number"
      value={tokens}
      onChange={(e)=>setTokens(Number(e.target.value))}
      required
      className="border p-2 rounded text-black"
    />

    <button
      type="submit"
      disabled={loading}
      className="bg-green-600 text-gray-500 py-2 rounded"
    >
      {loading ? "Creando..." : "Crear horario"}
    </button>

  </form>

</div>

);

}