<script setup lang="ts">
import { ref } from "vue";

const theme = ref<"light" | "dark">(localStorage.theme === "light" ? "light" : "dark" ?? "light");

const toggleTheme = () => {
  if (theme.value === "light") {
    localStorage.theme = "dark";
    document.documentElement.classList.add("dark");
    theme.value = "dark";
  } else {
    localStorage.theme = "light";
    document.documentElement.classList.remove("dark");
    theme.value = "light";
  }
};

const links = [
  {
    text: "Github",
    href: "https://github.com/aiktb/Genpwd",
  },
  {
    text: "Feedback",
    href: "https://github.com/aiktb/Genpwd/issues/",
  },
  {
    text: "Sponsor",
    href: "https://www.buymeacoffee.com/aiktb",
  },
];
</script>

<template>
  <footer class="flex items-center justify-between px-4 text-sm text-primary">
    <div class="flex items-center gap-3">
      <a
        v-for="{ text, href } of links"
        :href="href"
        target="_blank"
        class="cursor-pointer transition duration-300 hover:text-orange-800 hover:underline"
      >
        {{ text }}
      </a>
    </div>
    <button class="flex size-6 items-center justify-center" @click="toggleTheme">
      <span class="sr-only">Toggle Theme</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="themeIcon gradient-text size-6 animate-text-gradient bg-gradient-to-r from-primary from-20% via-indigo-500 to-primary to-80% bg-[size:200%] text-transparent"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <clipPath id="themeIconClip">
          <template v-if="theme === 'light'">
            <path d="M17 12a5 5 0 1 1-10 0a5 5 0 0 1 10 0" />
            <path
              d="M12 1.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75M3.669 3.716a.75.75 0 0 1 1.06-.047L6.95 5.7a.75.75 0 1 1-1.012 1.107L3.716 4.776a.75.75 0 0 1-.047-1.06m16.662 0a.75.75 0 0 1-.047 1.06l-2.222 2.031A.75.75 0 0 1 17.05 5.7l2.222-2.031a.75.75 0 0 1 1.06.047M1.25 12a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m18 0a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75m-2.224 5.025a.75.75 0 0 1 1.06 0l2.222 2.223a.75.75 0 0 1-1.06 1.06l-2.222-2.222a.75.75 0 0 1 0-1.06m-10.051 0a.75.75 0 0 1 0 1.061l-2.223 2.222a.75.75 0 0 1-1.06-1.06l2.222-2.223a.75.75 0 0 1 1.06 0M12 19.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75"
            />
          </template>
          <template v-else>
            <path
              d="M19.9 2.307a.483.483 0 0 0-.9 0l-.43 1.095a.484.484 0 0 1-.272.274l-1.091.432a.486.486 0 0 0 0 .903l1.091.432a.48.48 0 0 1 .272.273L19 6.81c.162.41.74.41.9 0l.43-1.095a.484.484 0 0 1 .273-.273l1.091-.432a.486.486 0 0 0 0-.903l-1.091-.432a.484.484 0 0 1-.273-.274zM16.033 8.13a.483.483 0 0 0-.9 0l-.157.399a.484.484 0 0 1-.272.273l-.398.158a.486.486 0 0 0 0 .903l.398.157c.125.05.223.148.272.274l.157.399c.161.41.739.41.9 0l.157-.4a.484.484 0 0 1 .272-.273l.398-.157a.486.486 0 0 0 0-.903l-.398-.158a.484.484 0 0 1-.272-.273z"
            />
            <path
              d="M12 22c5.523 0 10-4.477 10-10c0-.463-.694-.54-.933-.143a6.5 6.5 0 1 1-8.924-8.924C12.54 2.693 12.463 2 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10"
            />
          </template>
        </clipPath>
      </svg>
    </button>
  </footer>
</template>

<style scoped>
.themeIcon {
  clip-path: url(#themeIconClip);
}
</style>
