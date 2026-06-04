import { supabase } from "../src/config/supabase.js";

const countAll = async () => {
    const tables = [
        'roles',
        'users',
        'configurations',
        'parameters',
        'brands',
        'cars',
        'trips',
        'bookings',
        'reviews'
    ];

    console.log("-----------------------------------------");
    console.log("📊 SQL Database Current Status");
    console.log("-----------------------------------------");

    for (const table of tables) {
        const { count, error } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.error(`❌ Error on [${table}]:`, error.message);
        } else {
            console.log(`> ${table.padEnd(15)}: ${count} rows`);
        }
    }
    console.log("-----------------------------------------");
};

countAll();