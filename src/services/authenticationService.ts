import { HttpStatusCode } from 'axios';
import { useUserStore } from '@/stores/userStore';
import {
  handleAxiosError,
  displayErrorNotification,
  displaySuccessNotification
} from '@/utils/utils';
import { registerUserClient, loginUserClient } from '@/api/authenticationClient';
import type { RegisterUser, LoginUser } from '@/types/authentication.types';
import type { Router } from 'vue-router';

export async function registerUserService(registerUserData: RegisterUser) {
  try {
    const response = await registerUserClient(registerUserData);

    if (response?.status === HttpStatusCode.Ok) {
      // If the response is OK, notify the user that they have successfully registered and now they need to verify their email to get full access.
      displaySuccessNotification(response.data.message);
    }
  } catch (err) {
    displayErrorNotification('Something went wrong. Please try again.');
  }
}

export async function loginUserService(loginUserData: LoginUser, router: Router) {
  try {
    const userStore = useUserStore();
    const { setAccessToken } = userStore;
    // Create a new FormData object due to the way the backend expects that data (OAuth2PasswordRequestForm in FastAPI).
    const formData = new FormData();
    formData.append('username', loginUserData.email);
    formData.append('password', loginUserData.password);

    const response = await loginUserClient(formData);

    if (response?.status === HttpStatusCode.Ok) {
      setAccessToken(response.data.access_token);
      await router.push({ name: 'ChatCreate' });
      displaySuccessNotification('You have successfully logged in.');
    }
  } catch (err) {
    handleAxiosError(err, router);
  }
}

export function logoutUserService(router: Router) {
  const userStore = useUserStore();
  const { $reset } = userStore;

  $reset();
  router.push({ name: 'Home' });
  displaySuccessNotification('You have successfully logged out.');
}
