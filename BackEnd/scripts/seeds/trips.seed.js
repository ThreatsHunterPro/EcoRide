import { fakerFR as faker } from '@faker-js/faker';
import { supabase } from "../../src/config/supabase.js";

export const seedTrips = async () => {
    try {
        const { data: cars } = await supabase.from('cars').select('car_id');

        const cities = ['Paris', 'Lyon', 'Marseille', 'Nantes', 'Bordeaux'];
        const trips = Array.from({ length: 20 }).map(() => {
            const dep = faker.helpers.arrayElement(cities);
            let arr = faker.helpers.arrayElement(cities);
            while (arr === dep) arr = faker.helpers.arrayElement(cities);

            return {
                departure_date: faker.date.soon({ days: 30 }).toISOString().split('T')[0],
                departure_time: `${faker.number.int({ min: 6, max: 21 })}:00:00`,
                departure_location: dep,
                arrival_date: faker.date.soon({ days: 31 }).toISOString().split('T')[0],
                arrival_time: `${faker.number.int({ min: 8, max: 23 })}:00:00`,
                arrival_location: arr,
                status: 'pending',
                available_seats: faker.number.int({ min: 1, max: 4 }),
                price: faker.number.int({ min: 15, max: 55 }),
                car_id: faker.helpers.arrayElement(cars).car_id
            };
        });

        const { data, error } = await supabase.from('trips').insert(trips).select();
        if (error) throw error;
    } catch (err) {
        console.error("❌ Error seed-trips:", err.message);
    }
};