import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        // FIX: Provide a fallback to an empty string.
        // This prevents the key from becoming the literal string "undefined" in the build.
        // Your application code correctly uses 'process.env.API_KEY'.
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
