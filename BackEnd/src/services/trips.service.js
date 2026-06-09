import { supabase } from "../config/supabase.js";

/**
 * Service to manage EcoRide business logic for trips.
 * Updated to match the English schema used in our seeds.
 */
const tripsService = {
  /**
   * Search for carpool trips based on location and date (US 3 & 4).
   */
  searchTrips: async (from, to, date) => {
    try {
      const { data, error } = await supabase
        .from('trips')
        .select(`
          trip_id,
          departure_date,
          departure_time,
          departure_location,
          arrival_location,
          available_seats,
          price
        `)
        .ilike('departure_location', `%${from}%`)
        .ilike('arrival_location', `%${to}%`)
        .eq('departure_date', date)
        .gt('available_seats', 0)
        .order('departure_time', { ascending: true });

      if (error) throw error;

      return data.map(trip => ({
        id: trip.trip_id,
        departure_date: trip.departure_date,
        departure_time: trip.departure_time,
        from: trip.departure_location,
        to: trip.arrival_location,
        seats: trip.available_seats,
        price: trip.price,
        car: null,
        driver: null,
        is_ecological: false,
        co2_saved: 0 
      }));

    } catch (error) {
      console.error("TripsService Search Error:", error.message);
      return [];
    }
  },

  /**
   * Suggests the next available date if no trips are found (US 3).
   */
  findNextAvailableDate: async (from, to, currentDate) => {
    try {
      const { data, error } = await supabase
        .from('trips')
        .select('departure_date')
        .ilike('departure_location', `%${from}%`)
        .ilike('arrival_location', `%${to}%`)
        .gt('departure_date', currentDate) 
        .gt('available_seats', 0)
        .order('departure_date', { ascending: true })
        .limit(1)
        .maybeSingle();

      if (error || !data) return null;
      return data.departure_date;
    } catch (err) {
      return null;
    }
  }
};

export default tripsService;