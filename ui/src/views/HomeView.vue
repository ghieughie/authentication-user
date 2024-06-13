<script setup>
import { onMounted, watch } from "vue";

const props = defineProps({
  user: Object,
});

watch(props, () => {}, { immediate: true });
onMounted(() => {});
</script>

<template>
  <div class="w-full px-4">
    <div class="sm:mx-auto sm:text-center mb-16">
      <h4 class="font-semibold text-lg text-cyan-600 mb-2">Welcome</h4>
      <h2 class="font-bold text-dark text-3xl mb-4 sm:text-4xl lg:text-5xl">
        {{ user.name }}
      </h2>
    </div>
  </div>
</template>
