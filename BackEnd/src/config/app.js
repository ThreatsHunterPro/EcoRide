import express from 'express';
import cors from 'cors';
import { defineRoutes } from "../routes/index.js";
import { routesConfig } from "../routes/routes.js";
import errorMiddleware from "../middlewares/error.middleware.js";

const app = express();

// --- Middlewares ---
// Si FRONTEND_URL n'est pas définie sur Render, on sécurise par un tableau vide.
const allowedOrigins = process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [];

app.use(cors({ 
    origin: allowedOrigins, 
    credentials: true 
}));
app.use(express.json());

// --- Routes Initialization ---
defineRoutes(app, routesConfig);

// --- Health Check ---
app.get('/', (req, res) => res.send('EcoRide API is running !'));

// --- Error Handling ---
app.use(errorMiddleware);

export default app;