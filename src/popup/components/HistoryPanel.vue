<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";

import Password from "./Password.vue";
import Toggle from "./Toggle.vue";

const saveHistory = ref(true);

const items = [
  "99N0x!.!5p-t--,YCC7y",
  "*md%TZkg9:7)zcB_e+A)",
  "Eusc8ARt,N]g7T>bgE85",
  ".4g:_aC!X++q6YQ6rot}",
  "?M*!2.!7u,^zsd9q28qg",
  "6Ghc%K17-]>sA!=z)qLp",
  "Dhp:Pr1H6o2,vR,MY68}",
];
</script>

<template>
  <div class="text-wrap text-sm">
    <p class="text-center">
      This software
      <span class="text-primary">doesn&apos;t upload</span>
      any of your data to the cloud.
    </p>
    <label
      class="mt-1 flex select-none items-center justify-center gap-2 rounded border-2 border-orange-300 bg-sky-950 px-2 py-1 text-white dark:border-orange-500 dark:bg-slate-900"
    >
      <Toggle v-model="saveHistory" />
      Turn on the history feature
    </label>
    <ol class="mt-2 flex flex-col gap-2">
      <li
        v-for="item of items"
        class="flex select-all justify-between rounded-md bg-orange-200 px-2 py-1 font-mono"
      >
        <Password :password="item" />
        <div class="flex items-center gap-1.5 text-white">
          <button class="rounded bg-primary p-[1px] transition duration-300 hover:bg-orange-900">
            <span class="sr-only">Copy</span>
            <Icon
              aria-hidden="true"
              class="size-4"
              icon="material-symbols:content-copy-outline-rounded"
            />
          </button>
          <button class="rounded bg-primary p-[1px] transition duration-300 hover:bg-orange-900">
            <span class="sr-only">Delete</span>
            <Icon
              aria-hidden="true"
              class="size-4"
              icon="material-symbols:delete-outline-rounded"
            />
          </button>
        </div>
      </li>
    </ol>
  </div>
</template>
