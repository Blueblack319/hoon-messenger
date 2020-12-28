export interface userType {
  email: string;
  password: string;
  confirm: string;
  displayName: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string | Blob | null | undefined;
}

export interface signinType {
  email: string;
  password: string;
}
