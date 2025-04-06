import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
   plugins: [react()],
   test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/vitest.setup.ts'],
      alias: {
         '@': resolve(__dirname, './src'),
      },
      coverage: {
         provider: 'v8',
         reporter: ['text', 'json', 'html'],
         include: [
            'src/**/*.ts',
            'src/**/*.tsx'
         ],
         exclude: [
            'node_modules/',
            'src/**/*.css',
            'src/**/*.scss',
            'src/**/*.less',
            'src/**/*.config.ts',
            'src/**/index.ts',
            'src/**/index.tsx',
            '**/*.d.ts',
            '**/*.test.ts',
            '**/*.test.tsx',
            '**/*.spec.ts',
            '**/*.spec.tsx',
            'vitest.config.ts',
            'vitest.setup.ts',
         ],
      },
   },
   resolve: {
      alias: {
         '@': resolve(__dirname, './src'),
      },
   },
});