import AppError from "./app.error.js";

class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401);
  }
}

export default AuthenticationError;