"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "x-react/button";
import { IconHome, IconArrowLeft } from "x-react/icons";

export const NotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center">
        <div className="mb-8 relative">
          <div className="text-[10rem] font-bold text-gray-100 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-2">
              <div
                className="h-2 w-2 bg-primary rounded-full animate-bounce mx-auto"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="h-2 w-2 bg-primary rounded-full animate-bounce mx-auto"
                style={{ animationDelay: "0.3s" }}
              ></div>
              <div
                className="h-2 w-2 bg-primary rounded-full animate-bounce mx-auto"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Page non trouvée
        </h1>

        <p className="text-gray-600 mb-8">
          Oups ! La page que vous recherchez semble avoir disparu dans le
          cyberespace.
        </p>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="flex-1 bg-primary hover:bg-primary/90"
              startContent={<IconHome className="h-4 w-4 mr-2" />}
              onPress={() => router.push("/")}
            >
              <Link href="/">Retour à l&apos;accueil</Link>
            </Button>
            <Button
              variant="bordered"
              className="flex-1 border-border"
              onPress={() => router.back()}
              startContent={<IconArrowLeft className="h-4 w-4 mr-2" />}
            >
              Retour en arrière
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
