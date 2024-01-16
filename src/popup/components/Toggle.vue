<script setup lang="ts">
import { Switch } from "@headlessui/vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const _modelValue = ref(props.modelValue);

const emits = defineEmits(["update:modelValue"]);
</script>

<template>
  <Switch
    v-model="_modelValue"
    class="flex size-5 items-center justify-center rounded bg-orange-100 p-0.5 text-orange-700 outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
    @click="emits('update:modelValue', !props.modelValue)"
  >
    <Icon v-show="props.modelValue" aria-hidden="true" icon="tabler:check" />
  </Switch>
</template>
