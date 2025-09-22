export type UserProfile = {
  name: string;
  email: string;
  avatar: string | null;
  isPassphrase: boolean;
};

export type PartialUserProfile = Partial<UserProfile>;
