declare namespace Express {
  interface Request {
    currentUser: import('@user/models').User;
    payload: import('@auth/types').IAuthPayload;
  }
}
