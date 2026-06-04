import { supabase } from "../../src/config/supabase.js";

const seedConfigurations = async () => {
    try {
        console.log("⚙️  Starting Configurations seed...");

        const { data: users } = await supabase.from('users').select('user_id');

        if (!users?.length) {
            console.error("❌ Missing dependencies: no users found. Run seed:users first.");
            return;
        }

        const configurations = users.map((user) => ({
            user_id: user.user_id
        }));

        const { error } = await supabase.from('configurations').upsert(configurations);
        if (error) throw error;
        console.log(`✅ ${configurations.length} configurations synchronized.`);
    } catch (err) {
        console.error("❌ Error seed-configurations:", err.message);
    }
};

seedConfigurations();