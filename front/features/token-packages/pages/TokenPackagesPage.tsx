import { GetTokenPackages } from "@/features/token-packages/services/tokenPackageService";
import { TokenPackageResponse } from "@/features/token-packages/validators/Tokenpackageschema";

export default async function TokenPackagesPage() {
  const packages: TokenPackageResponse[] = await GetTokenPackages();

  return (
    <main className="bg-black min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Paquetes de tokens
        </h1>
        <div className="mt-2 h-0.5 w-16 bg-red-500" />
      </div>

      <div className="max-w-7xl mx-auto">
        {packages.length === 0 ? (
          <p className="text-white/50 text-center py-12">
            No hay paquetes disponibles.
          </p>
        ) : (
          <div
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            style={{
              gridTemplateColumns: `repeat(${Math.min(packages.length, 4)}, minmax(0, 1fr))`,
            }}
          >
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="border border-white/10 rounded-2xl p-6 text-white flex flex-col gap-4"
              >
                <div>
                  <h2 className="text-xl font-bold">{pkg.name}</h2>
                  {pkg.description && (
                    <p className="text-white/60 text-sm mt-1">
                      {pkg.description}
                    </p>
                  )}
                </div>
                <div className="flex items-end justify-between mt-auto">
                  <span className="text-2xl font-extrabold">
                    ${Number(pkg.price).toFixed(2)}
                  </span>
                  <span className="text-white/60 text-sm">
                    🪙 {pkg.tokenAmount} tokens
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
