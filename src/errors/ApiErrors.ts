import CustomError from "./CustomError";

export class ConflictError extends CustomError {
  public statusCode = 409;
  constructor(message: string) {
    super(message);
  }
}

export class ResourceNotFoundError extends CustomError {
  public statusCode = 404;
  constructor(message: string) {
    super(message);
  }
}

export class BadRequestError extends CustomError {
  public statusCode = 400;
  constructor(message: string) {
    super(message);
  }
}
