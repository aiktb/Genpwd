<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue"]);
const defaultSymbols = "!@#$%^&*()_+-=[]{};':\",./<>?\\|`~";

const handleClick = (symbol: string) => {
  const symbols = props.modelValue.split("");
  const index = symbols.indexOf(symbol);
  if (index === -1) {
    symbols.push(symbol);
  } else {
    symbols.splice(index, 1);
  }
  emits("update:modelValue", symbols.join(""));
};
</script>

<template>
  <div>
    <div
      class="relative z-10 flex size-[10rem] items-center justify-center rounded-md bg-slate-900 p-2 font-mono text-[12px] text-white shadow ring-2 ring-orange-300 ring-offset-1 dark:ring-primary"
    >
      <div class="grid grid-flow-row grid-cols-6 gap-1">
        <button
          v-for="symbol of defaultSymbols"
          :key="symbol"
          class="relative flex size-5 cursor-pointer select-none items-center justify-center rounded-sm border-2 border-orange-300 bg-sky-950 transition duration-200 hover:border-primary hover:text-primary dark:border-orange-200 dark:bg-slate-900 dark:hover:border-primary"
          :class="{
            'bg-gradient-to-t from-primary to-orange-200 bg-clip-text font-bold text-transparent':
              props.modelValue.includes(symbol),
          }"
          @click="handleClick(symbol)"
        >
          {{ symbol }}
        </button>
        <button
          class="col-span-2 flex h-5 cursor-pointer select-none items-center justify-center rounded-sm border-2 border-orange-300 bg-sky-950 bg-gradient-to-t from-primary to-orange-200 bg-clip-text font-bold text-transparent transition duration-200 hover:border-primary hover:text-primary dark:border-orange-200 dark:bg-slate-900 dark:hover:border-primary"
          @click="emits('update:modelValue', defaultSymbols)"
        >
          ALL
        </button>
        <button
          class="col-span-2 flex h-5 cursor-pointer select-none items-center justify-center rounded-sm border-2 border-orange-300 bg-sky-950 bg-gradient-to-t from-primary to-orange-200 bg-clip-text font-bold text-transparent transition duration-200 hover:border-primary hover:text-primary dark:border-orange-200 dark:bg-slate-900 dark:hover:border-primary"
          @click="emits('update:modelValue', '')"
        >
          NONE
        </button>
      </div>
    </div>
    <div
      aria-hidden="true"
      class="absolute bottom-0 left-1/2 size-4 -translate-x-1/2 translate-y-1/2 rotate-45 rounded-br bg-orange-300 shadow ring-2 ring-orange-300 ring-offset-1 dark:bg-primary dark:ring-primary"
    />
  </div>
</template>
