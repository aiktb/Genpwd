import headlessui from "@headlessui/tailwindcss";
import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.{vue,html}"],
  darkMode: "class",
  plugins: [
    forms,
    headlessui({ prefix: "ui" }).handler,
    plugin(({ addBase }) => {
      addBase({
        ":focus-visible": {
          borderRadius: "0.25rem",
        },
      });
      addBase({
        "@font-face": {
          fontDisplay: "swap",
          fontFamily: "DM Sans",
          fontStyle: "normal",
          fontWeight: "normal",
          src: "url('./fonts/dm-sans-regular.woff2') format('woff2')",
        },
      });
      addBase({
        "@font-face": {
          fontDisplay: "swap",
          fontFamily: "DM Sans",
          fontStyle: "normal",
          fontWeight: "bold",
          src: "url('./fonts/dm-sans-bold.woff2') format('woff2')",
        },
      });
      addBase({
        "@font-face": {
          fontDisplay: "swap",
          fontFamily: "Intel One Mono",
          fontStyle: "normal",
          fontWeight: "normal",
          src: "url('./fonts/intel-one-mono-regular.woff2') format('woff2')",
        },
      });
      addBase({
        "@font-face": {
          fontDisplay: "swap",
          fontFamily: "Lemon",
          fontStyle: "normal",
          fontWeight: "normal",
          src: "url('./fonts/lemon-regular.ttf') format('truetype')",
        },
      });
    }),
  ],
  theme: {
    fontFamily: {
      sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
      mono: ["Intel One Mono", ...defaultTheme.fontFamily.mono],
      display: ["Lemon", ...defaultTheme.fontFamily.serif],
    },
  },
} satisfies Config;
