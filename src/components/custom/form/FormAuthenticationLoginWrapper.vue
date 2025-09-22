<script setup lang="ts">
import BaseFormAuthenticationWrapper from '@/components/custom/form/BaseFormAuthenticationWrapper.vue';
import FormAuthenticationLogin from '@/components/custom/form/FormAuthenticationLogin.vue';
import ButtonThirdPartyAccess from '@/components/custom/button/ButtonThirdPartyAccess.vue';
</script>

<template>
  <BaseFormAuthenticationWrapper authenticationForm="register">
    <template #formHeader>Welcome back</template>
    <template #formSubHeader>Enter your credentials below to log in</template>
    <template #formBody>
      <FormAuthenticationLogin />
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
        text="Sign in with Google"
      />
      <ButtonThirdPartyAccess
        iconName="brand-github"
        text="Sign in with GitHub"
      />
    </template>
    <template #formFooterText>Don't have an account? </template>
    <template #formFooterButton>Sign up</template>
  </BaseFormAuthenticationWrapper>
</template>
