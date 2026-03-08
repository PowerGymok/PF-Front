import AdminClassesManage from "../components/AdminClasesManage";

export default function AdminClassesPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Gestión de clases
      </h1>

        <AdminClassesManage />
    </div>
  );
}