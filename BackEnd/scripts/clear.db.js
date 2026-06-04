import { supabase } from "../src/config/supabase.js";

const clearDatabase = async () => {
    console.log("-----------------------------------------");
    console.log("🧹 Starting Database Cleanup...");
    console.log("-----------------------------------------");

    // Order is strictly respected to avoid Foreign Key violations
    const tables = [
        { name: 'bookings',       idName: 'user_id' },
        { name: 'reviews',        idName: 'review_id' },
        { name: 'trips',          idName: 'trip_id' },
        { name: 'cars',           idName: 'car_id' },
        { name: 'parameters',     idName: 'parameter_id' },
        { name: 'configurations', idName: 'configuration_id' },
        { name: 'users',          idName: 'user_id' },
        { name: 'brands',         idName: 'brand_id' },
        { name: 'roles',          idName: 'role_id' }
    ];

    try {
        for (const table of tables) {
            let query = supabase.from(table.name).delete();

            if (table.name === 'users') {
                query = query.not('user_id', 'is', null);
            } else if (table.name === 'bookings') {
                query = query.not('user_id', 'is', null);
            } else {
                query = query.gt(table.idName, 0);
            }

            const { error } = await query;

            if (error) {
                console.error(`❌ Failed to clear [${table.name}]:`, error.message);
            } else {
                console.log(`✅ Table [${table.name}] cleared.`);
            }
        }
    } catch (err) {
        console.error("❌ Unexpected error:", err.message);
    }

    console.log("-----------------------------------------");
    console.log("✨ Cleanup finished!");
    console.log("-----------------------------------------");
};

clearDatabase();