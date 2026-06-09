import { authRoutes } from './auth.route.js';
import { userRoutes } from './users.route.js';
import { brandRoutes } from './brands.route.js';
import { tripRoutes } from './trips.route.js';
import { adminRoutes } from './admin.route.js';

// Specific routes
const publicRoutes = [
    ['GET', 'rules', 'getRules', [], 'rulesController'],
];

export const routesConfig = [
    ...publicRoutes,
    ...authRoutes,
    ...userRoutes,
    ...brandRoutes,
    ...tripRoutes,
    ...adminRoutes,
];