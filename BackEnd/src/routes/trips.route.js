import authMiddleware from "../middlewares/auth.middleware.js";

export const tripRoutes = [
    ['GET',  'trips/search', 'search', [], 'tripsController'],
    ['GET',  'trips/:id',     'getById', [], 'tripsController'],
    ['POST', 'trips',         'create',  [authMiddleware], 'tripsController'],
    ['POST', 'trips/:id/book','book',    [authMiddleware], 'tripsController'],
];