<script setup>
import { onMounted, watch } from "vue";

const props = defineProps({
  user: Object,
});

watch(props, () => {}, { immediate: true });
onMounted(() => {});
</script>

<template>
  <div class="flex flex-wrap">
    <div class="mx-auto font-bold text-5xl text-cyan-700">
      Welcome,
      {{ user.name }}
    </div>
  </div>
</template>
