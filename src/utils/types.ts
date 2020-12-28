export interface signupType {
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

export interface userType {
  email: string;
  uid: string;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  token: string | null;
  provider: string | null;
  avatarUrl: string | null;
}
