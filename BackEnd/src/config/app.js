import express from 'express';
import cors from 'cors';
import { defineRoutes } from "../routes/index.js";
import { routesConfig } from "../routes/routes.js";
import errorMiddleware from "../middlewares/error.middleware.js";

const app = express();

// --- Middlewares ---
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// --- Routes Initialization ---
defineRoutes(app, routesConfig);

// --- Health Check ---
app.get('/', (req, res) => res.send('EcoRide API is running 🌿'));

// --- Error Handling ---
app.use(errorMiddleware);

export default app;