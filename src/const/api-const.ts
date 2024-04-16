export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ApiRoute {
  Login = 'login',
  Logout = 'logout',
  Hotels = 'offers',
  Favorite = 'favorite',
  Comments = 'comments',
}

export const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
export const REQUEST_TIMEOUT = 5000;

export enum HttpCode {
  Unauthorized = 401,
}
