<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";

import { Storage } from "@plasmohq/storage";

import { StorageKey } from "~background";

import Password from "./Password.vue";
import Toggle from "./Toggle.vue";

const storage = new Storage({ area: "local" });
const isOpenHistory = ref<boolean>(await storage.get(StorageKey.IS_OPEN_HISTORY));
const history = ref<string[]>(await storage.get(StorageKey.HISTORY));

const copy = (text: string) => {
  navigator.clipboard.writeText(text);
};
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
      <Toggle
        v-model="isOpenHistory"
        @update:model-value="
          () => {
            storage.set(StorageKey.IS_OPEN_HISTORY, isOpenHistory);
            history = [];
            storage.set(StorageKey.HISTORY, []);
          }
        "
      />
      Turn on the history feature
    </label>
    <ol v-if="history.length" class="mt-2 flex flex-col gap-2">
      <TransitionGroup
        move-class="transition duration-500 ease"
        enter-active-class="transition duration-500 ease"
        leave-active-class="transition duration-500 ease absolute"
        enter-from-class="opacity-0 transform translate-x-7"
        leave-to-class="opacity-0 transform translate-x-7"
      >
        <li
          v-for="item of history"
          :key="item"
          class="flex justify-between rounded-md bg-orange-200 px-2 py-1 font-mono"
        >
          <Password
            :password="item"
            class="w-[21ch] select-all overflow-hidden text-ellipsis whitespace-nowrap text-black"
          />
          <div class="flex items-center gap-1.5 text-white">
            <button
              class="rounded bg-primary p-[1px] transition duration-300 hover:bg-orange-900"
              @click="copy(item)"
            >
              <span class="sr-only">Copy</span>
              <Icon
                aria-hidden="true"
                class="size-4"
                icon="material-symbols:content-copy-outline-rounded"
              />
            </button>
            <button
              class="rounded bg-primary p-[1px] transition duration-300 hover:bg-orange-900"
              @click="
                () => {
                  history.splice(history.indexOf(item), 1);
                  storage.set(StorageKey.HISTORY, history);
                }
              "
            >
              <span class="sr-only">Delete</span>
              <Icon
                aria-hidden="true"
                class="size-4"
                icon="material-symbols:delete-outline-rounded"
              />
            </button>
          </div>
        </li>
      </TransitionGroup>
    </ol>
    <div v-else class="mt-14 flex w-full items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        aria-hidden="true"
        class="size-[7rem] text-orange-300 dark:text-orange-200"
      >
        <path
          fill="currentColor"
          d="M10 4a6 6 0 0 1 5.946 5.192c.558.152 1.08.389 1.553.697A7.5 7.5 0 0 0 5 4.409V3.25a.75.75 0 0 0-1.5 0v3c0 .414.336.75.75.75h3a.75.75 0 0 0 0-1.5H6.031A5.977 5.977 0 0 1 10 4m.257 7a5.518 5.518 0 0 1 1.949-1.5H10.5V6.25a.75.75 0 0 0-1.5 0v4c0 .414.336.75.75.75zm-.368 6.5a5.473 5.473 0 0 1-.697-1.554a6.001 6.001 0 0 1-5.188-6.169a.75.75 0 1 0-1.499-.054A7.5 7.5 0 0 0 9.89 17.5m9.111-3a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-2.646-1.146a.5.5 0 0 0-.708-.708L14.5 13.793l-1.146-1.147a.5.5 0 0 0-.708.708l1.147 1.146l-1.147 1.146a.5.5 0 0 0 .708.708l1.146-1.147l1.146 1.147a.5.5 0 0 0 .708-.708L15.207 14.5z"
        />
      </svg>
    </div>
  </div>
</template>
