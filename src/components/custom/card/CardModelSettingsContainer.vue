<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';
import DescriptionParagraph from '@/components/custom/description/DescriptionParagraph.vue';
import CardModelSettingsGeneral from '@/components/custom/card/CardModelSettingsGeneral.vue';
import { Separator } from '@/components/shadcn/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor
} from '@/components/shadcn/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/shadcn/tooltip';
import { ref, computed } from 'vue';

const isCardVisible = ref(false);

const getButtonVariant = computed(() => {
  return isCardVisible.value ? 'secondary' : 'ghost';
});
</script>

<template>
  <Popover v-model:open="isCardVisible">
    <PopoverAnchor asChild>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <ButtonIcon
                iconName="adjustments-horizontal"
                :variant="getButtonVariant"
              />
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent
            align="end"
            side="bottom"
          >
            Quick settings
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </PopoverAnchor>
    <PopoverContent
      align="end"
      side="bottom"
      class="rounded-lg"
    >
      <div class="p-1">
        <div class="mb-4 flex flex-col gap-y-1.5">
          <h3 class="text-base font-semibold leading-none tracking-tight">Quick settings</h3>
          <DescriptionParagraph textSize="sm">
            Quickly change basic model settings here.
          </DescriptionParagraph>
          <Separator />
        </div>
        <CardModelSettingsGeneral />
      </div>
    </PopoverContent>
  </Popover>
</template>
