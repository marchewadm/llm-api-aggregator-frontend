<script setup lang="ts">
import NavigationHome from '@/components/custom/navigation/NavigationHome.vue';
import FormAuthenticationContainer from '@/components/custom/form/FormAuthenticationContainer.vue';
import AnimationWave from '@/components/custom/animation/AnimationWave.vue';
</script>

<template>
  <main class="w-full min-h-screen p-2 flex flex-col relative">
    <NavigationHome />
    <FormAuthenticationContainer />
    <AnimationWave />
  </main>
</template>
