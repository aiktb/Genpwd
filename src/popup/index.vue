<script setup lang="ts">
import "~/assets/style.css";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import { Icon } from "@iconify/vue";

import Footer from "./components/Footer.vue";
import GenpwdPanel from "./components/GenpwdPanel.vue";
import HistoryPanel from "./components/HistoryPanel.vue";

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

const tabs = [
  {
    name: "Genpwd",
    icon: "material-symbols:key-outline-rounded",
    component: GenpwdPanel,
  },
  {
    name: "History",
    icon: "material-symbols:history-rounded",
    component: HistoryPanel,
  },
];
</script>

<template>
  <div class="">
    <main class="h-[25rem]">
      <TabGroup>
        <TabList class="flex space-x-1 rounded-xl bg-orange-300/20 p-1 shadow dark:bg-blue-900/20">
          <Tab v-for="{ name, icon } of tabs" :key="name" v-slot="{ selected }" as="template">
            <button
              :class="[
                'relative flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold leading-5 outline-none ring-orange-400 ring-offset-2 transition focus:ring-2',
                selected
                  ? 'bg-orange-200 text-orange-600 shadow'
                  : 'hover:bg-orange-500/20 dark:hover:bg-white/[0.12]',
              ]"
            >
              <span
                v-show="selected"
                class="absolute right-0 top-0 flex h-3 w-3 -translate-y-1/2 translate-x-1/2"
              >
                <span
                  class="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"
                />
                <span class="relative inline-flex h-3 w-3 rounded-full bg-primary" />
              </span>
              <Icon class="size-6" :icon="icon" />
              {{ name }}
            </button>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel
            v-for="{ name, component } of tabs"
            :key="name"
            :class="[
              'rounded-xl p-3',
              'ring-white/60 ring-offset-2 ring-offset-orange-400 focus:outline-none focus-visible:ring-2',
            ]"
          >
            <component :is="component" />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
    <Footer />
  </div>
</template>
