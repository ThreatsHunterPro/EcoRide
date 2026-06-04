import { supabase } from "../config/supabase.js";

/**
 * Get platform statistics for Admin (US 13)
 */
const getStats = async (req, res) => {
    try {
        // Example: count total trips
        const { count, error } = await supabase
            .from('trip')
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