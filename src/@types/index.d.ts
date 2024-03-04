export interface ExpressUser {
  userId?: number;
  name?: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: ExpressUser;
    }
  }
}
