<script setup lang="ts">
import { computed, ref } from "vue";

interface Props {
  modelValue: number;
  min: number;
  max: number;
  step: number;
}

const props = defineProps<Props>();
const emits = defineEmits(["update:modelValue"]);

const trackRef = ref<HTMLElement | null>(null);
const thumbRef = ref<HTMLElement | null>(null);

const position = computed(() => {
  const percent = (props.modelValue - props.min) / (props.max - props.min);
  return {
    left: `${percent * 100}%`,
  };
});

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

const handlePointerDown = (event: PointerEvent) => {
  const track = trackRef.value;
  const thumb = thumbRef.value;
  if (!track || !thumb) return;

  const updateValue = (event: PointerEvent) => {
    const { width, left } = track.getBoundingClientRect();
    const { clientX } = event;
    const percent = clamp((clientX - left) / width, 0, 1);
    const value = Math.round(percent * (props.max - props.min) + props.min);
    if (value !== props.modelValue) {
      emits("update:modelValue", value);
    }
  };
  const handlePointerMove = (event: PointerEvent) => {
    updateValue(event);
  };
  const handlePointerUp = (event: PointerEvent) => {
    track.releasePointerCapture(event.pointerId);
    track.removeEventListener("pointermove", handlePointerMove);
    track.removeEventListener("pointerup", handlePointerUp);
  };

  track.setPointerCapture(event.pointerId);
  track.addEventListener("pointermove", handlePointerMove);
  track.addEventListener("pointerup", handlePointerUp);
  updateValue(event);
};
</script>

<template>
  <div
    class="flex w-full items-center py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-primary"
    tabindex="0"
    role="slider"
    :aria-valuemin="props.min"
    :aria-valuemax="props.max"
    :aria-valuenow="props.modelValue"
    @keydown.left="
      () => {
        emits('update:modelValue', clamp(props.modelValue - props.step, props.min, props.max));
      }
    "
    @keydown.right="
      () => {
        emits('update:modelValue', clamp(props.modelValue + props.step, props.min, props.max));
      }
    "
  >
    <div
      class="flex h-1 w-full cursor-pointer justify-center rounded-full bg-orange-100"
      @pointerdown="handlePointerDown"
    >
      <div ref="trackRef" class="relative h-1 w-[90%]">
        <div
          ref="thumbRef"
          :style="position"
          class="absolute top-1/2 flex size-5 -translate-x-1/2 -translate-y-1/2 select-none items-center justify-center rounded-full bg-primary text-[12px] text-white shadow-inner drop-shadow-xl"
        >
          {{ modelValue }}
        </div>
      </div>
    </div>
  </div>
</template>
