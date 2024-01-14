<script setup lang="ts">
import { ref } from "vue";

interface Props {
  modelValue: number;
  min: number;
  max: number;
  step: number;
}

defineProps<Props>();
defineEmits(["update:modelValue"]);

const trackRef = ref<HTMLElement | null>(null);
const thumbRef = ref<HTMLElement | null>(null);
</script>

<template>
  <div class="flex w-full items-center">
    <div class="relative flex h-1 w-full justify-center rounded-full bg-orange-100">
      <div ref="trackRef" class="h-1 w-[90%]">
        <div
          ref="thumbRef"
          class="absolute left-1/2 top-1/2 flex size-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none items-center justify-center rounded-full bg-primary font-mono text-[12px] text-white shadow-inner drop-shadow-xl"
        >
          {{ modelValue }}
        </div>
      </div>
    </div>
  </div>
</template>
