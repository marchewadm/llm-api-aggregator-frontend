<script setup lang="ts">
import ButtonSelectModel from '@/components/custom/button/ButtonSelectModel.vue';
import DescriptionParagraph from '@/components/custom/description/DescriptionParagraph.vue';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Textarea } from '@/components/shadcn/textarea';
import { Separator } from '@/components/shadcn/separator';
import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';
import { useChatSidebarStore } from '@/stores/chatSidebarStore';

const chatStore = useChatStore();
const chatSidebarStore = useChatSidebarStore();

const { isModelSidebarVisible } = storeToRefs(chatSidebarStore);
const { customInstructions } = storeToRefs(chatStore);
</script>

<template>
  <form
    class="h-full"
    v-show="isModelSidebarVisible"
    @submit.prevent
  >
    <fieldset class="h-full px-4 pb-4 border rounded-lg flex flex-col overflow-y-auto">
      <legend class="text-base font-semibold mb-1 -ml-1 px-1">Model settings</legend>
      <div class="mb-4">
        <DescriptionParagraph
          textSize="sm"
          class="mb-2"
        >
          Set up the language model by choosing a provider, model type and optional settings.
        </DescriptionParagraph>
        <Separator />
      </div>
      <div class="mb-4 grid gap-3">
        <Label>Select model</Label>
        <DescriptionParagraph textSize="sm">
          Choose a language model from the list of available providers and models. Each model has
          different capabilities and use cases.
        </DescriptionParagraph>
        <ButtonSelectModel />
      </div>
      <div class="mb-4 flex flex-col flex-grow gap-3">
        <Label for="custom-instructions">Custom instructions</Label>
        <DescriptionParagraph textSize="sm">
          You can set custom instructions to guide the model's behavior. Specify a persona or role
          to shape the model's responses.
        </DescriptionParagraph>
        <Textarea
          placeholder="You can set custom instructions for your model here."
          class="resize-none flex-grow"
          id="custom-instructions"
          v-model="customInstructions"
        />
      </div>
      <div class="mb-4 grid gap-3">
        <Label for="temperature">Temperature</Label>
        <DescriptionParagraph textSize="sm">
          Control the randomness of the model's responses. Higher values yield creative outputs,
          while lower values result in more focused responses.
        </DescriptionParagraph>
        <Input
          placeholder="0.0"
          type="number"
          id="temperature"
        />
      </div>
      <div class="mb-4 grid gap-3">
        <Label for="top-p">Top P</Label>
        <DescriptionParagraph textSize="sm">
          Chooses from words whose combined probability meets the P threshold. Lower values make
          outputs more precise, while higher values increase creativity.
        </DescriptionParagraph>
        <Input
          placeholder="0.0"
          type="number"
          id="top-p"
        />
      </div>
      <div class="grid gap-3">
        <Label for="top-k">Top K</Label>
        <DescriptionParagraph textSize="sm">
          Selects from the top K most likely words. Lower values focus on more predictable outputs,
          while higher values add more diversity.
        </DescriptionParagraph>
        <Input
          placeholder="0.0"
          type="number"
          id="top-k"
        />
      </div>
    </fieldset>
  </form>
</template>
