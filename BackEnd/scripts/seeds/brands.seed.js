import { supabase } from "../../src/config/supabase.js";

const seedBrands = async () => {
    try {
        console.log("🏷️  Starting Brands seed...");

        const { error } = await supabase.from('brands').upsert([
            { brand_id: 1,  label: 'Tesla' },
            { brand_id: 2,  label: 'Renault' },
            { brand_id: 3,  label: 'Peugeot' },
            { brand_id: 4,  label: 'Citroën' },
            { brand_id: 5,  label: 'Volkswagen' },
            { brand_id: 6,  label: 'BMW' },
            { brand_id: 7,  label: 'Mercedes' },
            { brand_id: 8,  label: 'Toyota' },
            { brand_id: 9,  label: 'Ford' },
            { brand_id: 10, label: 'Audi' }
        ]);
        if (error) throw error;
        console.log("✅ Brands synchronized.");
    } catch (err) {
        console.error("❌ Error seed-brands:", err.message);
    }
};

seedBrands();