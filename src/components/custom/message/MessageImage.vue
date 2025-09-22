<script setup lang="ts">
defineProps<{
  imageUrl: string;
}>();
</script>

<template>
  <img
    :src="imageUrl"
    class="mb-2 rounded-lg cursor-pointer transition-opacity duration-200 hover:opacity-70 group-hover:opacity-70"
    v-viewer
  />
</template>
