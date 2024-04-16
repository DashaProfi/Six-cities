import { AuthorizationStatus } from '../const/api-const';
export interface UserInfo {
  avatarUrl: string;
  email: string;
  id: number;
  isPro: boolean;
  name: string;
  token: string;
  authorizationStatus: AuthorizationStatus;
}

export interface UserAuthorizationData {
  email: string;
  password: string;
}
