import { authRoutes } from './auth.route.js';
import { tripRoutes } from './trips.route.js';
import { adminRoutes } from './admin.route.js';

// Specific routes
const publicRoutes = [
    ['GET', 'rules', 'getRules', [], 'rulesController'],
];

export const routesConfig = [
    ...publicRoutes,
    ...authRoutes,
    ...tripRoutes,
    ...adminRoutes,
];