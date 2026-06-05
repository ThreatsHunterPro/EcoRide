import { supabase } from "../src/config/supabase.js";
import { colors } from "../src/utils/colors.js";
import { connectMongo } from "../src/config/mongo.js"; // Importe ta config
import Log from "../src/models/log.model.js";         // Importe ton modèle
import mongoose from "mongoose";

export const countAll = async () => {
    console.log(`${colors.blue}╔══════════════════════════════════════════════════╗`);
    console.log(`║ 📊 État global (Supabase + MongoDB)              ║`);
    console.log(`╚══════════════════════════════════════════════════╝${colors.reset}`);

    // 1. Comptage Supabase
    const tables = [
        'roles', 'users', 'configurations', 'parameters', 
        'brands', 'cars', 'trips', 'bookings', 'reviews'
    ];

    for (const table of tables) {
        const { count, error } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true });

        const rowColor = (count > 0) ? colors.green : colors.yellow;
        console.log(` ${colors.blue}•${colors.reset} ${table.padEnd(16)} : ${rowColor}${count ?? 0}${colors.reset} lignes (SQL)`);
    }

    // 2. Comptage MongoDB
    try {
        await connectMongo();
        const logsCount = await Log.countDocuments();
        const mongoColor = (logsCount > 0) ? colors.green : colors.yellow;
        console.log(` ${colors.blue}•${colors.reset} ${"logs".padEnd(16)} : ${mongoColor}${logsCount}${colors.reset} docs (NoSQL)`);
    } catch (err) {
        console.log(` ${colors.red}• logs             : Erreur de connexion MongoDB${colors.reset}`);
    } finally {
        await mongoose.disconnect();
    }

    console.log(`${colors.blue}╚══════════════════════════════════════════════════╝${colors.reset}\n`);
};

// Auto-exécution si lancé seul
if (process.argv[1].endsWith('count.db.js')) {
    countAll().catch(err => {
        console.error("Erreur lors du comptage:", err);
        process.exit(1);
    });
}