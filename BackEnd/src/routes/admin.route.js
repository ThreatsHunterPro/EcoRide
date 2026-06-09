import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import userMiddleware from "../middlewares/user.middleware.js"; // if needed for specific checks

export const adminRoutes = [
    ['GET',    'admin/users', 'getAllUsers', [authMiddleware, adminMiddleware], 'usersController'],
    ['DELETE', 'admin/users/:id', 'removeUser', [authMiddleware, adminMiddleware], 'usersController'],
    ['GET',    'admin/stats', 'getStats', [authMiddleware, adminMiddleware], 'statsController'],
];