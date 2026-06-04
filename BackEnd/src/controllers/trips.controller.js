import tripsService from "../services/trips.service.js";
import Log from "../models/log.model.js";
import { supabase } from "../config/supabase.js";

/**
 * Create a new trip (US 3)
 */
const create = async (req, res) => {
    try {
        const { 
            departure_date, 
            departure_time, 
            departure_location, 
            arrival_location, 
            available_seats, 
            price, 
            car_id 
        } = req.body;
        
        // Note: Check your DB column names (English vs French)
        // Based on your previous seeds, columns were in English
        const { data, error } = await supabase
            .from('trip') // Table name corrected to singular
            .insert([{ 
                departure_date, 
                departure_time, 
                departure_location, 
                arrival_location, 
                available_seats, 
                price, 
                car_id 
            }])
            .select();

        if (error) throw error;
        res.status(201).json({ success: true, data });
    } 
    catch (error) {
        console.error("CreateTrip Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

/**
 * Search for available trips with filters (US 3 & 4)
 */
const search = async (req, res) => {
    try {
        const { from, to, date, ecoFilter, maxPrice, minRating } = req.query;

        // Validation
        if (!from || !to || !date) {
            return res.status(400).json({ error: "Departure, arrival, and date are required." });
        }

        // Fetching trips via service
        let trips = await tripsService.searchTrips(from, to, date);

        // Suggested dates if empty
        let suggestedDate = null;
        if (trips.length === 0) {
            suggestedDate = await tripsService.findNextAvailableDate(from, to, date);
        }

        // Functional Filtering
        if (ecoFilter === 'true') {
            trips = trips.filter(trip => trip.is_ecological === true);
        }
        if (maxPrice) {
            trips = trips.filter(trip => trip.price <= parseFloat(maxPrice));
        }
        if (minRating) {
            trips = trips.filter(trip => trip.driver?.rating >= parseFloat(minRating));
        }

        // MongoDB Logging (Non-blocking)
        Log.create({
            action: "SEARCH_TRIP",
            details: { from, to, date, filters: { ecoFilter, maxPrice, minRating } },
            resultsCount: trips.length
        }).catch(err => console.warn("Log failed:", err.message));

        res.json({
            success: true,
            count: trips.length,
            data: trips,
            suggestedDate
        });

    } 
    catch (error) {
        console.error("SearchTrips Error:", error);
        res.status(500).json({ error: "An error occurred during search." });
    }
};

/**
 * Get trip details by ID
 */
const getById = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('trip')
            .select(`
                *,
                car:car_id (*),
                driver:user_id (username, photo_url)
            `)
            .eq('trip_id', req.params.id)
            .single();

        if (error || !data) return res.status(404).json({ error: "Trip not found" });
        
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Book a seat on a trip (US 3 & 4)
 */
const book = async (req, res) => {
    try {
        const tripId = req.params.id;
        
        // 1. Check seat availability
        const { data: trip, error: fetchError } = await supabase
            .from('trip')
            .select('available_seats')
            .eq('trip_id', tripId)
            .single();

        if (fetchError || trip.available_seats <= 0) {
            return res.status(400).json({ error: "No seats available" });
        }

        // 2. Decrease available seats
        const { error: updateError } = await supabase
            .from('trip')
            .update({ available_seats: trip.available_seats - 1 })
            .eq('trip_id', tripId);

        if (updateError) throw updateError;

        res.json({ success: true, message: "Trip booked successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { 
    create, 
    search,
    getById, 
    book
};