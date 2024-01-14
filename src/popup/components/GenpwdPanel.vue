<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

import Password from "./Password.vue";
import RangeSlider from "./RangeSlider.vue";
import SymbolsSet from "./SymbolsSet.vue";
import Toggle from "./Toggle.vue";

const settings = ref({
  hasNumbers: true,
  hasSymbols: true,
  length: 20,
});

const password = ref("zqsxeNYq?GzT9*9Wbym");
</script>

<template>
  <h1 class="mb-4 flex flex-col items-center justify-center text-lg font-bold">
    <div class="relative items-center justify-center text-wrap text-center">
      Obtaining your random
      <span
        class="gradient-text animate-text-gradient bg-gradient-to-r from-primary from-20% via-indigo-500 to-primary to-80% bg-[size:200%] bg-clip-text text-transparent"
      >
        strong password
      </span>
    </div>
  </h1>
  <div
    class="flex h-16 w-full items-center justify-center rounded-lg bg-orange-200 font-mono text-slate-950"
  >
    <div class="select-all text-center">
      <Password :password="password" />
    </div>
  </div>
  <div class="mt-3 flex items-center justify-around">
    <button
      class="flex items-center justify-center gap-1 rounded-3xl bg-primary px-5 py-0.5 text-sm text-white transition hover:bg-orange-800 focus-visible:bg-orange-800"
    >
      <Icon
        aria-hidden="true"
        class="size-5"
        icon="material-symbols:content-copy-outline-rounded"
      />
      Copy password
    </button>
    <button
      class="group flex items-center justify-center gap-1 rounded-full bg-primary p-0.5 text-white transition hover:bg-orange-800 focus-visible:bg-orange-800"
    >
      <Icon
        aria-hidden="true"
        class="size-5 transition-transform duration-500 group-hover:rotate-180"
        icon="material-symbols:sync-rounded"
      />
      <span class="sr-only">Reset</span>
    </button>
  </div>
  <div class="relative mt-5">
    <div
      aria-hidden="true"
      class="absolute left-1/2 top-0 size-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border-l-2 border-t-2 border-orange-300 bg-sky-950 dark:border-orange-500 dark:bg-slate-900"
    />
    <div
      class="z-10 flex w-full flex-col gap-3 rounded-md border-2 border-orange-300 bg-sky-950 px-4 py-2 text-sm font-normal text-white dark:border-orange-500 dark:bg-slate-900"
    >
      <div class="flex items-center justify-between">
        <div class="flex flex-col gap-2">
          <label class="flex items-center justify-start gap-2">
            <Toggle v-model="settings.hasNumbers" />
            Numbers
          </label>
          <label class="flex items-center justify-start gap-2">
            <Toggle v-model="settings.hasSymbols" />
            Symbols
          </label>
        </div>
        <div class="flex flex-col gap-2">
          <label class="flex items-center justify-start gap-2">
            <Toggle v-model="settings.hasNumbers" />
            Uppercase
          </label>
          <label class="flex items-center justify-start gap-2">
            <Toggle v-model="settings.hasSymbols" />
            Lowercase
          </label>
        </div>
      </div>
      <label class="flex items-center justify-center gap-2 font-normal">
        Length
        <RangeSlider v-model="settings.length" :min="8" :max="40" :step="1" />
      </label>
      <Popover class="relative flex">
        <PopoverButton
          class="flex flex-1 select-none items-center justify-center gap-2 rounded bg-orange-100 font-bold text-primary outline-none transition duration-300 hover:bg-primary hover:text-orange-100 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
        >
          <Icon aria-hidden="true" class="inline size-5" icon="material-symbols:app-registration" />
          Choose symbols set
          <Icon
            aria-hidden="true"
            class="inline size-5 transition-transform duration-300 ui-open:rotate-180 ui-open:transform"
            icon="material-symbols:keyboard-double-arrow-down-rounded"
          />
        </PopoverButton>
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <PopoverPanel>
            <SymbolsSet class="absolute bottom-10 left-1/2 -translate-x-1/2" />
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  </div>
</template>
