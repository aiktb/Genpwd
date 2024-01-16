<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { Icon } from "@iconify/vue";
import { onMounted, onUnmounted, ref, watch } from "vue";

import { Storage } from "@plasmohq/storage";

import { StorageKey, type Settings } from "~background/index";

import Password from "./Password.vue";
import RangeSlider from "./RangeSlider.vue";
import SymbolsSet from "./SymbolsSet.vue";
import Toggle from "./Toggle.vue";

const storage = new Storage({ area: "local" });
const settings = ref<Settings>({
  length: await storage.get(StorageKey.LENGTH),
  hasNumbers: await storage.get(StorageKey.HAS_NUMBERS),
  hasSymbols: await storage.get(StorageKey.HAS_SYMBOLS),
  hasUppercase: await storage.get(StorageKey.HAS_UPPERCASE),
  hasLowercase: await storage.get(StorageKey.HAS_LOWERCASE),
  symbolsSet: await storage.get(StorageKey.SYMBOLS_SET),
  isOpenHistory: await storage.get(StorageKey.IS_OPEN_HISTORY),
  history: await storage.get(StorageKey.HISTORY),
});

// Returns an empty string when all boolean options are false.
const getPassword = () => {
  const { length, hasLowercase, hasNumbers, hasSymbols, hasUppercase, symbolsSet } = settings.value;
  const lowercaseSet = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbersSet = "0123456789";
  // Maybe "empty array"
  const characterSet = [
    ...(hasLowercase ? lowercaseSet : []),
    ...(hasUppercase ? uppercaseSet : []),
    ...(hasNumbers ? numbersSet : []),
    ...(hasSymbols ? symbolsSet : []),
  ];
  // 0 <= random < max < 256
  const random = (max: number) => {
    const uint8 = new Uint8Array(1);
    window.crypto.getRandomValues(uint8);
    return uint8[0]! % max;
  };

  const isLimited = new Array<boolean>(length).fill(false);
  const limit = (needLimit: boolean, characterSet: string) => {
    if (!needLimit || !characterSet.length) {
      return;
    }
    // Prevent the same index from being overwritten multiple times.
    let passwordIndex: number;
    do {
      passwordIndex = random(length);
    } while (isLimited[passwordIndex]);
    isLimited[passwordIndex] = true;

    const characterSetIndex = random(characterSet.length);
    password[passwordIndex] = characterSet[characterSetIndex]!;
  };

  const password: string[] = [];
  for (let i = 0; i < length; i++) {
    const charIndex = random(characterSet.length);
    const randomChar = characterSet[charIndex];
    if (randomChar) {
      password.push(randomChar);
    }
  }

  limit(hasLowercase, lowercaseSet);
  limit(hasUppercase, uppercaseSet);
  limit(hasNumbers, numbersSet);
  limit(hasSymbols, symbolsSet);

  return password.join("");
};

const password = ref(getPassword());

const updateStorage = (key: StorageKey) => {
  const value = settings.value[key];
  storage.set(key, value);
};

const copy = () => {
  const history = settings.value.history;
  navigator.clipboard.writeText(password.value);
  if (
    settings.value.isOpenHistory &&
    password.value.length &&
    // Adjacent and identical passwords are not saved.
    !(history.length !== 0 && history[0] === password.value)
  ) {
    // Only the latest 7 passwords are saved.
    settings.value.history = [password.value, ...settings.value.history].slice(0, 7);
    storage.set(StorageKey.HISTORY, settings.value.history);
  }
};
const copiedTipIsOpen = ref(false);
const handleCtrlC = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === "c" && !window.getSelection()?.toString()) {
    handleCopyClick();
  }
};

onMounted(() => {
  // Register the global shortcut key `Ctrl + C` for user convenience.
  window.addEventListener("keydown", handleCtrlC);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleCtrlC);
});

const handleCopyClick = () => {
  copy();
  copiedTipIsOpen.value = true;
};

watch(copiedTipIsOpen, (value) => {
  if (value) {
    setTimeout(() => {
      copiedTipIsOpen.value = false;
    }, 500);
  }
});
</script>

<template>
  <h1 class="mb-4 flex flex-col items-center justify-center text-lg font-bold">
    <div class="relative items-center justify-center text-wrap text-center">
      Obtaining your random
      <span
        class="animate-text-gradient bg-gradient-to-r from-primary from-20% via-indigo-500 to-primary to-80% bg-[size:200%] bg-clip-text text-transparent"
      >
        strong password
      </span>
    </div>
  </h1>
  <div
    class="flex h-16 w-full items-center justify-center rounded-lg bg-orange-200 font-mono font-bold text-slate-950"
  >
    <div v-if="password.length" class="select-all text-center">
      <Password :password="password" class="text-wrap break-all p-2" />
    </div>
    <div v-else class="text-center font-sans">
      Please
      <span class="text-primary">toggle</span>
      settings
    </div>
  </div>
  <div class="mt-3 flex items-center justify-around">
    <button
      class="relative flex select-none items-center justify-center gap-1 rounded-3xl bg-primary px-4 py-0.5 text-sm text-white transition hover:bg-orange-800 focus-visible:bg-orange-800"
      @click="handleCopyClick"
    >
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div class="absolute -top-10" v-if="copiedTipIsOpen">
          <div
            class="rounded-md border-2 border-primary bg-orange-200 px-2.5 py-0.5 text-slate-950 dark:bg-slate-900 dark:text-white"
          >
            Copied!
          </div>
          <div
            aria-hidden="true"
            class="absolute bottom-0 left-1/2 z-10 size-2.5 -translate-x-1/2 translate-y-1/2 rotate-45 rounded-br border-b-2 border-r-2 border-primary bg-orange-200 dark:bg-slate-900"
          />
        </div>
      </Transition>
      <Icon
        aria-hidden="true"
        class="size-5"
        icon="material-symbols:content-copy-outline-rounded"
      />
      Copy pass
      <kbd
        class="ml-1 inline-flex h-4 items-center justify-center rounded px-1 text-[10px] font-medium text-white ring-1 ring-inset ring-orange-50"
        >CTRL</kbd
      >
      <kbd
        class="inline-flex h-4 items-center justify-center rounded px-1 text-[10px] font-medium text-white ring-1 ring-inset ring-orange-50"
        >C</kbd
      >
    </button>
    <button
      class="group flex items-center justify-center gap-1 rounded-full bg-primary p-0.5 text-white transition hover:bg-orange-800 focus-visible:bg-orange-800"
      @click="
        () => {
          password = getPassword();
        }
      "
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
            <Toggle
              v-model="settings.hasNumbers"
              @update:model-value="
                () => {
                  updateStorage(StorageKey.HAS_NUMBERS);
                  password = getPassword();
                }
              "
            />
            Numbers
          </label>
          <label class="flex items-center justify-start gap-2">
            <Toggle
              v-model="settings.hasSymbols"
              @update:model-value="
                () => {
                  updateStorage(StorageKey.HAS_SYMBOLS);
                  password = getPassword();
                }
              "
            />
            Symbols
          </label>
        </div>
        <div class="flex flex-col gap-2">
          <label class="flex items-center justify-start gap-2">
            <Toggle
              v-model="settings.hasUppercase"
              @update:model-value="
                () => {
                  updateStorage(StorageKey.HAS_UPPERCASE);
                  password = getPassword();
                }
              "
            />
            Uppercase
          </label>
          <label class="flex items-center justify-start gap-2">
            <Toggle
              v-model="settings.hasLowercase"
              @update:model-value="
                () => {
                  updateStorage(StorageKey.HAS_LOWERCASE);
                  password = getPassword();
                }
              "
            />
            Lowercase
          </label>
        </div>
      </div>
      <label class="flex items-center justify-center gap-2 font-normal">
        Length
        <RangeSlider
          v-model="settings.length"
          :min="8"
          :max="40"
          :step="1"
          @update:model-value="
            () => {
              updateStorage(StorageKey.LENGTH);
              password = getPassword();
            }
          "
        />
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
            <SymbolsSet
              v-model="settings.symbolsSet"
              class="absolute bottom-10 left-1/2 -translate-x-1/2"
              @update:model-value="
                () => {
                  updateStorage(StorageKey.SYMBOLS_SET);
                  password = getPassword();
                }
              "
            />
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  </div>
</template>
