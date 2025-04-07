"use client";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const handleRetry = () => {
    console.log("Retrying...");
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 p-6">
      <div className="text-center max-w-md">
        {/* Icône d'erreur */}
        <svg
          className="w-24 h-24 mx-auto mb-6 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>

        {/* Titre d'erreur */}
        <h1 className="text-3xl font-semibold mb-3 text-gray-900">
          {error.name || "Error"}
        </h1>

        {/* Message d'erreur */}
        <p className="text-lg mb-8 text-gray-600">
          {error.message || "Something went wrong."}
        </p>

        {/* Bouton simple */}
        <button
          onClick={handleRetry}
          className="px-6 py-2.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200 shadow-sm"
        >
          Try Again
        </button>

        {/* Message de support */}
        <p className="mt-6 text-sm text-gray-500">
          Si l&apos;erreur persiste, veuillez contacter le support.
        </p>

        {/* Code d'erreur si disponible */}
        {error.digest && (
          <div className="mt-4 text-gray-400 font-mono text-xs">
            Error ID: {error.digest}
          </div>
        )}
      </div>
    </div>
  );
}
