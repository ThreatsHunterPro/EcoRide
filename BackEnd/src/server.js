import dotenv from 'dotenv';
dotenv.config();

import app from "./config/app.js";
import { connectMongo } from "./config/mongo.js";

const startServer = async () => {
  try {
    await connectMongo();

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`
      ███████╗ ██████╗ ██████╗ ██████╗ ██╗██████╗ ███████╗
      ██╔════╝██╔════╝██╔═══██╗██╔══██╗██║██╔══██╗██╔════╝
      █████╗  ██║     ██║   ██║██████╔╝██║██║  ██║█████╗  
      ██╔══╝  ██║     ██║   ██║██╔══██╗██║██║  ██║██╔══╝  
      ███████╗╚██████╗╚██████╔╝██║  ██║██║██████╔╝███████╗
      ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝
      🌿 EcoRide API running on http://localhost:${PORT}
      `);
    });
  } catch (error) {
    console.error("Échec du démarrage du serveur:", error);
    process.exit(1);
  }
};

startServer();