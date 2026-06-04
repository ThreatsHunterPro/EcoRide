import { loginLimiter } from "../middlewares/rateLimiters.middleware.js";

export const authRoutes = [
    // [method, path, handlerName, [middlewares], controllerName]
    ['POST', 'auth/login', 'login', [loginLimiter], 'authController'],
    ['POST', 'auth/register', 'create', [], 'usersController'],
];