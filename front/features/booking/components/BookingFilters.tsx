"use client";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  intensityFilter: string;
  setIntensityFilter: (value: string) => void;
}

export default function BookingsFilters({
  search,
  setSearch,
  intensityFilter,
  setIntensityFilter,
}: Props) {
  return (
    <div className="flex flex-col gap-4 max-w-5xl">
      <select
        value={intensityFilter}
        onChange={(e) => setIntensityFilter(e.target.value)}
        className="
          w-full md:w-56
          p-4 rounded-xl
          bg-black border border-white/20
        "
      >
        <option value="">Todas las intensidades</option>
        <option value="BAJO">Bajo</option>
        <option value="MEDIO">Medio</option>
        <option value="ALTO">Alto</option>
      </select>

      <input
        type="text"
        placeholder="Buscar entrenamiento o coach..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          p-4 rounded-xl
          bg-black border border-white/20
          focus:outline-none
          focus:ring-2 focus:ring-white/30
          transition
        "
      />
    </div>
  );
}
