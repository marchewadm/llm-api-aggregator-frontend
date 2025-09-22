<script setup lang="ts">
import BaseFormAuthenticationWrapper from '@/components/custom/form/BaseFormAuthenticationWrapper.vue';
import FormAuthenticationResetPassword from '@/components/custom/form/FormAuthenticationResetPassword.vue';
</script>

<template>
  <BaseFormAuthenticationWrapper authenticationForm="login">
    <template #formHeader>Reset your password</template>
    <template #formSubHeader>We will send you an email with instructions</template>
    <template #formBody>
      <FormAuthenticationResetPassword />
    </template>
    <template #formFooterText>I've changed my mind, </template>
    <template #formFooterButton>take me back!</template>
  </BaseFormAuthenticationWrapper>
</template>
