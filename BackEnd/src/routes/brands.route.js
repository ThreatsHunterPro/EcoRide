import authMiddleware from "../middlewares/auth.middleware.js";
import brandController from "../controllers/brands.controller.js";

export const brandRoutes = [
    ['GET', 'brands', 'getBrands', [authMiddleware], 'brandsController'],
];
