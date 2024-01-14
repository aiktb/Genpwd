<script setup lang="ts">
const symbols = "!@#$%^&*()_+-=[]{};':\",./<>?\\|`~";
</script>

<template>
  <div class="absolute">
    <div
      class="relative z-10 flex size-[10rem] items-center justify-center rounded-md bg-sky-950 p-2 font-mono text-[12px] font-bold text-white shadow ring-2 ring-orange-300 ring-offset-1 dark:bg-slate-900 dark:ring-orange-500"
    >
      <div class="grid grid-flow-row grid-cols-6 gap-1">
        <button
          v-for="symbol of symbols"
          class="flex size-5 cursor-pointer select-none items-center justify-center rounded-sm border-2 border-orange-300 bg-sky-950 transition duration-200 hover:border-primary hover:text-primary dark:border-orange-200 dark:bg-slate-900 dark:hover:border-primary"
        >
          {{ symbol }}
        </button>
        <div
          class="col-span-2 flex h-5 cursor-pointer select-none items-center justify-center rounded-sm border-2 border-orange-300 bg-sky-950 transition duration-200 hover:border-primary hover:text-primary dark:border-orange-200 dark:bg-slate-900 dark:hover:border-primary"
        >
          ALL
        </div>
        <div
          class="col-span-2 flex h-5 cursor-pointer select-none items-center justify-center rounded-sm border-2 border-orange-300 bg-sky-950 transition duration-200 hover:border-primary hover:text-primary dark:border-orange-200 dark:bg-slate-900 dark:hover:border-primary"
        >
          NONE
        </div>
      </div>
    </div>
    <div
      aria-hidden="true"
      class="absolute bottom-0 left-1/2 size-4 -translate-x-1/2 translate-y-1/2 rotate-45 rounded-br bg-orange-300 shadow ring-2 ring-orange-300 ring-offset-1 dark:bg-orange-500 dark:ring-orange-500"
    />
  </div>
</template>
