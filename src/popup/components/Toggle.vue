<script setup lang="ts">
import { Switch } from "@headlessui/vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits(["update:modelValue"]);
</script>

<template>
  <Switch
    v-model="props.modelValue"
    class="flex size-5 items-center justify-center rounded bg-orange-100 p-0.5 text-orange-700 outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
    @click="emits('update:modelValue', !props.modelValue)"
  >
    <Icon v-show="props.modelValue" icon="tabler:check" />
  </Switch>
</template>
