<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<template>
  <div class="ml-auto w-fit max-w-full bg-secondary py-2 px-4 rounded-2xl break-words">
    <p class="leading-7">
      {{ message }}
    </p>
  </div>
</template>
