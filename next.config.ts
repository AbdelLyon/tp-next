import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   // Optimisations expérimentales
   experimental: {
      ppr: true,
      // Utilisation de turbopack (déjà activé dans vos scripts)
      serverActions: {
         bodySizeLimit: '2mb',
      },
   },

   // Configuration des images
   images: {
      unoptimized: true,
   },

   // Optimisation de la compilation
   compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
   },

   // Optimisation des performances
   reactStrictMode: true,
   poweredByHeader: false,

   // Optimisation du chargement des modules, adapté à vos packages
   modularizeImports: {
      'lucide-react': {
         transform: 'lucide-react/dist/esm/icons/{{member}}',
      },
      '@radix-ui/react-': {
         transform: '@radix-ui/react-{{member}}',
      },
   },

   // Optimisation des dépendances externes
   transpilePackages: ['rest-api-client', 'x-react'],

   // Optimisation de cache pour les tests
   onDemandEntries: {
      // période en ms pendant laquelle une page doit rester en mémoire
      maxInactiveAge: 60 * 1000,
      // nombre de pages qui doivent être conservées en mémoire
      pagesBufferLength: 5,
   },
};

export default nextConfig;