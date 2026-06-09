import authMiddleware from "../middlewares/auth.middleware.js";
import usersController from "../controllers/users.controller.js";

export const userRoutes = [
    ['GET', 'users/account', 'getUser', [authMiddleware], 'usersController'],
    ['PUT', 'users/account', 'updateUser', [authMiddleware], 'usersController']
];