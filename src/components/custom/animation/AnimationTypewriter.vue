<script setup lang="ts">
import typewriterData from '@/assets/typewriterData.json';
import { delay } from '@/utils/utils';
import { ref, onMounted } from 'vue';

const typewriterTopicsArray = [...typewriterData.title];
const typewriterDescriptionsArray = [...typewriterData.text];

const isFadeIn = ref(false);
const typewriterTopicTitle = ref('');
const typewriterTopicDescription = ref('');

const typeText = async () => {
  let randomIndex = Math.floor(Math.random() * typewriterTopicsArray.length);

  for (;;) {
    isFadeIn.value = true;
    typewriterTopicTitle.value = typewriterTopicsArray[randomIndex];
    typewriterTopicDescription.value = '';

    for (const char of typewriterDescriptionsArray[randomIndex]) {
      typewriterTopicDescription.value += char;
      await delay(Math.random() * 50 + 20);
    }

    await delay(3500);
    isFadeIn.value = false;
    await delay(700);
    randomIndex++;

    if (randomIndex === typewriterTopicsArray.length) {
      randomIndex = 0;
    }
  }
};

onMounted(async () => {
  await typeText();
});
</script>

<template>
  <div class="w-5/6 hidden md:block">
    <h1
      class="text-3xl font-semibold tracking-tighter"
      :class="{
        'fade-out-base fade-out-slower': !isFadeIn,
        'fade-in-base fade-in-faster': isFadeIn
      }"
    >
      {{ typewriterTopicTitle }}
    </h1>
    <p
      class="h-20 text-2xl tracking-tight"
      :class="{
        'fade-out-base fade-out-faster': !isFadeIn,
        'fade-in-base fade-in-slower': isFadeIn
      }"
    >
      {{ typewriterTopicDescription }}<span class="cursor">|</span>
    </p>
  </div>
</template>

<style scoped>
.cursor {
  animation: blink 1s infinite;
}

.fade-in-base {
  opacity: 1;
  transform: translateY(-20px);
}

.fade-in-faster {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.fade-in-slower {
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.fade-out-base {
  opacity: 0;
  transform: translateY(20px);
}

.fade-out-faster {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.fade-out-slower {
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
