import { supabase } from "../../src/config/supabase.js";

const seedRoles = async () => {
    try {
        console.log("👤 Starting Roles seed...");

        const { error } = await supabase.from('roles').upsert([
            { role_id: 1, label: 'admin' },
            { role_id: 2, label: 'employee' },
            { role_id: 3, label: 'user' }
        ]);
        if (error) throw error;
        console.log("✅ Roles (admin, employee, user) synchronized.");
    } catch (err) {
        console.error("❌ Error seed-roles:", err.message);
    }
};

seedRoles();