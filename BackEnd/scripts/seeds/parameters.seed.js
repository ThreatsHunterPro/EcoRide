import { supabase } from "../../src/config/supabase.js";

export const seedParameters = async () => {
    try {
        const { data: configurations } = await supabase.from('configurations').select('configuration_id');

        if (!configurations?.length) {
            console.error("❌ Missing dependencies: no configurations found. Run seed:configurations first.");
            return;
        }

        const parameters = configurations.flatMap((config) => ([
            { property: 'site_maintenance', value: 'false', configuration_id: config.configuration_id },
            { property: 'commission_rate',  value: '2.00',  configuration_id: config.configuration_id }
        ]));

        const { data, error } = await supabase.from('parameters').insert(parameters).select();
        if (error) throw error;
    } catch (err) {
        console.error("❌ Error seed-parameters:", err.message);
    }
};