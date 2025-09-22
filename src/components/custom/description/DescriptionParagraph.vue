<script setup lang="ts">
interface Props {
  textSize?: 'xs' | 'sm' | 'base';
}

const { textSize = 'base' } = defineProps<Props>();
</script>

<template>
  <p
    class="text-muted-foreground"
    :class="`text-${textSize}`"
  >
    <slot></slot>
  </p>
</template>
