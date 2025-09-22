<script setup lang="ts">
import DescriptionParagraph from '@/components/custom/description/DescriptionParagraph.vue';
import FormProfileAccountDetails from '@/components/custom/form/FormProfileAccountDetails.vue';
import FormProfileChangePassword from '@/components/custom/form/FormProfileChangePassword.vue';
import { ScrollArea } from '@/components/shadcn/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/tabs';
</script>

<template>
  <ScrollArea class="h-full">
    <Tabs
      default-value="account"
      class="pl-1 pr-3"
    >
      <TabsList class="w-full grid grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <DescriptionParagraph textSize="xs">
          Make changes to your account here. Click save when you're done.
        </DescriptionParagraph>
        <FormProfileAccountDetails />
      </TabsContent>
      <TabsContent value="password">
        <DescriptionParagraph textSize="xs">
          Change your password here. After saving, you'll be logged out.
        </DescriptionParagraph>
        <FormProfileChangePassword />
      </TabsContent>
    </Tabs>
  </ScrollArea>
</template>
