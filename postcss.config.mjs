// Enable Tailwind in all environments except when running Vitest unit tests.
// Using NODE_ENV==='test' can unintentionally disable Tailwind for e2e/dev servers.
const isVitest = !!process.env.VITEST;
export default {
  plugins: isVitest ? [] : ["@tailwindcss/postcss"],
};
