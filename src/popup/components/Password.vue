<script setup lang="ts">
const props = defineProps({
  password: {
    type: String,
    required: true,
  },
});

const getCharColor = (char: string) => {
  if (/[a-zA-Z]/.test(char)) return "text-black";
  if (/[0-9]/.test(char)) return "text-blue-600";
  return "text-primary";
};
</script>

<template>
  <div>
    <span v-for="char of props.password" :class="getCharColor(char)">
      {{ char }}
    </span>
  </div>
</template>
