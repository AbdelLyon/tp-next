"use client";
import { Button } from "x-react/button";

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
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* Icône d'erreur */}
        <svg
          className="w-24 h-24 mx-auto mb-6"
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
        <h1 className="text-3xl font-semibold mb-3">{error.name || "Error"}</h1>

        {/* Message d'erreur */}
        <p className="text-lg mb-8">Something went wrong.</p>

        {/* Bouton simple */}
        <Button
          onPress={handleRetry}
          className="px-6 py-2.5  bg-content1  h-10 w-30  my-z rounded-md hover:opacity-80 transition-colors duration-200 shadow-sm"
        >
          Try Again
        </Button>

        {/* Message de support */}
        <p className="mt-6 text-sm">
          Si l&apos;erreur persiste, veuillez contacter le support.
        </p>

        {/* Code d'erreur si disponible */}
        {error.digest && (
          <div className="mt-4 font-mono text-xs">Error ID: {error.digest}</div>
        )}
      </div>
    </div>
  );
}
