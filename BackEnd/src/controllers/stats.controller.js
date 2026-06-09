import { supabase } from "../config/supabase.js";

const getStats = async (req, res) => {
    try {
        const { count, error } = await supabase
            .from('trips')
            .select('*', { count: 'exact', head: true });

        if (error) throw error;

        res.json({
            success: true,
            data: {
                totalTrips: count,
                platformHealth: "OK",
                date: new Date()
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { getStats };