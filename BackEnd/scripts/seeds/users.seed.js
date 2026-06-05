import bcrypt from 'bcrypt';
import { fakerFR as faker } from '@faker-js/faker'; 
import { supabase } from "../../src/config/supabase.js";

export const seedUsers = async () => {
    try {
        // Bcrypt generates a 60-character string
        const hashedPassword = await bcrypt.hash("Password123", 10);

        // Fetching the 'user' role
        const { data: roles, error: roleError } = await supabase
            .from('roles')
            .select('role_id')
            .eq('label', 'user');

        if (roleError || !roles || roles.length === 0) {
            console.error("❌ Error: 'user' role not found. Please run seed:config first.");
            return;
        }

        const targetRoleId = roles[0].role_id;
        const usersToInsert = Array.from({ length: 10 }).map(() => ({
            lastname: faker.person.lastName().substring(0, 45),
            firstname: faker.person.firstName().substring(0, 45),
            email: faker.internet.email().toLowerCase().substring(0, 45),
            password: hashedPassword, // Ensure your SQL column is VARCHAR(60+)
            phone: faker.phone.number().substring(0, 20),
            address: faker.location.streetAddress().substring(0, 45),
            birth_date: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0],
            username: faker.internet.username().substring(0, 45),
            role_id: targetRoleId,
        }));

        const { data, error } = await supabase
            .from('users')
            .insert(usersToInsert)
            .select();

        if (error) {
            console.error("❌ Supabase Insertion Error:", error.message);
            if (error.message.includes("varying(50)")) {
                console.error("💡 Advice: Your 'password' column MUST be at least VARCHAR(60).");
            }
            return;
        }

    } catch (err) {
        console.error("❌ Unexpected script error:", err.message);
    }
};