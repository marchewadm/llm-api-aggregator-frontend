<script setup lang="ts">
import BaseFormAuthenticationWrapper from '@/components/custom/form/BaseFormAuthenticationWrapper.vue';
import FormAuthenticationRegister from '@/components/custom/form/FormAuthenticationRegister.vue';
import ButtonThirdPartyAccess from '@/components/custom/button/ButtonThirdPartyAccess.vue';
</script>

<template>
  <BaseFormAuthenticationWrapper authenticationForm="login">
    <template #formHeader>Create an account</template>
    <template #formSubHeader>Fill out the form below to create your account</template>
    <template #formBody>
      <FormAuthenticationRegister />
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t"></span>
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <ButtonThirdPartyAccess
        iconName="brand-google-filled"
        text="Sign up with Google"
      />
      <ButtonThirdPartyAccess
        iconName="brand-github"
        text="Sign up with GitHub"
      />
    </template>
    <template #formFooterText>Already have an account? </template>
    <template #formFooterButton>Sign in</template>
  </BaseFormAuthenticationWrapper>
</template>
