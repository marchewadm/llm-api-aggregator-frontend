<script setup lang="ts">
import IconApiProvider from '@/components/custom/icon/IconApiProvider.vue';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import 'highlight.js/styles/base16/material.css';
import { delay } from '@/utils/utils';
import { ref, computed, onMounted } from 'vue';

const props = defineProps<{
  message: string;
  apiProviderId: number;
  isAnimated?: boolean;
}>();

const displayedWordCount = ref(0);
const messageWords = ref<string[]>(props.message.split(' '));

const md: MarkdownIt = new MarkdownIt({
  highlight: function (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs p-4 rounded-md my-1 whitespace-pre-wrap overflow-x-auto"><code>' +
          hljs.highlight(str, { language: lang }).value +
          '</code></pre>'
        );
      } catch (err) {
        console.error('Error highlighting code:', err);
      }
    }

    return (
      '<pre class="hljs p-4 rounded-md my-1 whitespace-pre-wrap overflow-x-auto"><code>' +
      md.utils.escapeHtml(str) +
      '</code></pre>'
    );
  }
});

const typewriter = async () => {
  for (let i = 0; i < messageWords.value.length; i++) {
    displayedWordCount.value = i + 1;
    await delay(Math.random() * 80 + 20);
  }
};

const renderedMessage = computed(() => {
  if (props.isAnimated) {
    const partialMessage = messageWords.value.slice(0, displayedWordCount.value).join(' ');
    return md.render(partialMessage);
  } else {
    return md.render(props.message);
  }
});

onMounted(async () => {
  if (props.isAnimated) {
    await typewriter();
  }
});
</script>

<template>
  <div class="col-span-2 flex gap-x-3">
    <IconApiProvider
      :apiProviderId="props.apiProviderId"
      class="flex-shrink-0 mt-1"
    />
    <div
      class="assistant-message leading-7 overflow-x-auto"
      v-dompurify-html="renderedMessage"
    ></div>
  </div>
</template>

<style>
.assistant-message hr {
  @apply my-4;
}

.assistant-message ol,
.assistant-message ul {
  @apply pl-5;
}

.assistant-message ol {
  @apply list-decimal;
}

.assistant-message ul {
  @apply list-disc;
}

.assistant-message table {
  @apply min-w-full border;
}

.assistant-message thead {
  @apply bg-secondary;
}

.assistant-message th {
  @apply px-4 py-2 text-left text-sm font-medium;
}

.assistant-message td {
  @apply px-4 py-2 text-sm;
}

.assistant-message tr {
  @apply border-t;
}

.assistant-message tbody tr:nth-child(even) {
  @apply bg-muted;
}

code:not(pre code) {
  @apply bg-secondary p-1 rounded-md;
}
</style>
