import { fakerFR as faker } from '@faker-js/faker';
import { supabase } from "../../src/config/supabase.js";

export const seedBookings = async () => {
    try {
        const { data: users } = await supabase.from('users').select('user_id');
        const { data: trips } = await supabase.from('trips').select('trip_id');

        if (!users?.length || !trips?.length) {
            console.error(`❌ Missing dependencies: ${users?.length || 0} users, ${trips?.length || 0} trips.`);
            return;
        }

        // Avoid duplicate (user_id, trip_id) pairs
        const pairs = new Set();
        const bookings = [];

        for (let i = 0; i < 15; i++) {
            let user_id, trip_id, key;
            let attempts = 0;
            do {
                user_id = faker.helpers.arrayElement(users).user_id;
                trip_id = faker.helpers.arrayElement(trips).trip_id;
                key = `${user_id}-${trip_id}`;
                attempts++;
                if (attempts > 50) break;
            } while (pairs.has(key));

            if (!pairs.has(key)) {
                pairs.add(key);
                bookings.push({
                    user_id,
                    trip_id,
                    status: faker.helpers.arrayElement(['pending', 'confirmed', 'cancelled']),
                    booking_date: faker.date.recent({ days: 30 }).toISOString()
                });
            }
        }

        const { data, error } = await supabase.from('bookings').insert(bookings).select();
        if (error) throw error;
    } catch (err) {
        console.error("❌ Error seed-bookings:", err.message);
    }
};