import type { Config } from "tailwindcss";
export default {
  content: [  "./src/**/*.{html,ts}",
  "./node_modules/flowbite/**/*.js" ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {} },
  plugins: [  require('flowbite/plugin')({
    charts: true,
})],
} satisfies Config;
