import { fakerFR as faker } from '@faker-js/faker';
import { supabase } from "../../src/config/supabase.js";

const seedReviews = async () => {
    try {
        const { data: users } = await supabase.from('users').select('user_id');

        const reviews = Array.from({ length: 15 }).map(() => ({
            comment: faker.lorem.sentence(),
            rate: faker.number.int({ min: 1, max: 5 }),
            status: 'pending',
            user_id: faker.helpers.arrayElement(users).user_id
        }));

        const { data, error } = await supabase.from('reviews').insert(reviews).select();
        if (error) throw error;
        console.log(`⭐ ${data.length} reviews created!`);
    } catch (err) {
        console.error("❌ Error seed-reviews:", err.message);
    }
};

seedReviews();