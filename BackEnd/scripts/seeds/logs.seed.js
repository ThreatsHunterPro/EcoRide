import { connectMongo } from "../../src/config/mongo.js";
import Log from "../../src/models/log.model.js";
import mongoose from "mongoose";

export const seedLogs = async () => {
    try {
        await connectMongo();

        const logs = [
            { userId: "1", action: "login",    details: { ip: "192.168.1.1" } },
            { userId: "2", action: "register", details: { email: "test@test.com" } },
            { userId: "1", action: "booking",  details: { trip_id: 5, status: "confirmed" } },
            { userId: "3", action: "logout",   details: {} }
        ];

        await Log.insertMany(logs);
    } catch (err) {
        console.error("❌ Error seed-logs:", err.message);
    } finally {
        await mongoose.disconnect();
    }
};