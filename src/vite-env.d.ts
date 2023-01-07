/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DOMAIN: string;
  readonly VITE_CLIENT_ID: string;
  readonly VITE_CLIENT_SECRET: string;
  readonly VITE_AUDIENCE: string;
  readonly VITE_DOMAIN_BD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
