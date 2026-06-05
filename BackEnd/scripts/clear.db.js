import { supabase } from "../src/config/supabase.js";
import { connectMongo } from "../src/config/mongo.js";
import { colors } from "../src/utils/colors.js";
import mongoose from "mongoose";

export const clearSupabase = async () => {
    console.log(`${colors.blue}╔══════════════════════════════════════════════════╗`);
    console.log(`║ 🧹 Nettoyage SQL (Supabase) en cours...          ║`);
    console.log(`╚══════════════════════════════════════════════════╝${colors.reset}`);

    const tables = [
        { name: 'reviews', pk: 'review_id' },        // Enfant de bookings/trips
        { name: 'bookings', pk: 'status' },         // Enfant de trips/users
        { name: 'parameters', pk: 'parameter_id' }, // Enfant de configurations
        { name: 'configurations', pk: 'configuration_id' }, // Enfant de users
        { name: 'trips', pk: 'trip_id' },           // Enfant de cars
        { name: 'cars', pk: 'car_id' },             // Enfant de brands
        { name: 'users', pk: 'user_id' },           // Enfant de roles
        { name: 'brands', pk: 'brand_id' },         // Parent
        { name: 'roles', pk: 'role_id' }            // Parent ultime
    ];

    for (const table of tables) {
        const tableName = table.name.padEnd(16);

        const { data, error } = await supabase
            .from(table.name)
            .delete()
            .not(table.pk, 'is', null) 
            .select();

        if (error) {
            console.log(`${colors.red} ❌  ${tableName} : ÉCHEC -> ${error.message}`);
        } else if (data && data.length > 0) {
            console.log(`${colors.green} ✅ ${tableName} : Nettoyée (${data.length} lignes)`);
        } else {
            console.log(`${colors.blue} ℹ️  ${tableName} : déjà vide`);
        }
    }

    console.log(`${colors.blue}╚══════════════════════════════════════════════════╝${colors.reset}`);
    console.log("✨ Nettoyage de Supabase terminé.\n");
};

export const clearMongoDB = async () => {
    console.log(`${colors.blue}╔══════════════════════════════════════════════════╗`);
    console.log(`║ 🧹 Nettoyage NoSQL (MongoDB) en cours...         ║`);
    console.log(`╚══════════════════════════════════════════════════╝${colors.reset}`);

    try {
        await connectMongo();
        await mongoose.connection.db.dropDatabase();
        await mongoose.disconnect();
        console.log("✨Nettoyage de MongoDB terminé.\n");
    } catch (err) {
        console.log("⚠️ MongoDB non disponible (ou connexion échouée) :", err.message);
    }
};

if (process.argv[1].endsWith('clear.db.js')) {
    clearSupabase().then(() => {
        console.log("Nettoyage Supabase terminé.");
        process.exit(0);
    }).catch(err => {
        console.error("Erreur lors du nettoyage:", err);
        process.exit(1);
    });
}