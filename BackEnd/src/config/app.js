import express from 'express';
import cors from 'cors';
import { defineRoutes } from "../routes/index.js";
import { routesConfig } from "../routes/routes.js";
import errorMiddleware from "../middlewares/error.middleware.js";

const app = express();

// --- Middlewares ---
const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    process.env.FRONTEND_URL
].filter(Boolean)

if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

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