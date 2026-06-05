import { colors } from "../src/utils/colors.js";
import { clearSupabase, clearMongoDB } from "./clear.db.js";
import { countAll } from "./count.db.js";  
import { seedBookings } from "./seeds/bookings.seed.js";
import { seedBrands } from "./seeds/brands.seed.js";
import { seedCars } from "./seeds/cars.seed.js";
import { seedConfigurations } from "./seeds/configurations.seed.js";
import { seedParameters } from "./seeds/parameters.seed.js";
import { seedReviews } from "./seeds/reviews.seed.js";
import { seedRoles } from "./seeds/roles.seed.js";
import { seedTrips } from "./seeds/trips.seed.js";
import { seedUsers } from "./seeds/users.seed.js";
import { seedLogs } from "./seeds/logs.seed.js";

const logStep = (message) => {
    console.log(`${colors.green} ✅ ${message}${colors.reset}`);
};

const runMasterSeed = async () => {
    console.log(`\n${colors.yellow}╔══════════════════════════════════════════════════╗`);
    console.log(`║ 🚀 Lancement du Master Seed                      ║`);
    console.log(`╚══════════════════════════════════════════════════╝${colors.reset}`);

    try {
        await clearSupabase();
        await clearMongoDB();

        console.log(`${colors.blue}╔══════════════════════════════════════════════════╗`);
        console.log(`║ 🚀 Génération des contenus                       ║`);
        console.log(`╚══════════════════════════════════════════════════╝${colors.reset}`);
       
        await seedRoles();
        logStep("Rôles synchronisés");
        
        await seedBrands();
        logStep("Marques synchronisées");

        await seedUsers();
        logStep("Utilisateurs créés");

        await seedCars();
        logStep("Voitures créées");

        await seedTrips();
        logStep("Covoiturages créés");

        await seedBookings();
        logStep("Réservations créées");
        
        await seedConfigurations();
        logStep("Configurations synchronisées");
        
        await seedParameters();
        logStep("Paramètres synchronisés");

        await seedReviews();
        logStep("Avis ajoutés");

        await seedLogs();
        logStep("Logs ajoutés");
        console.log(`${colors.blue}╚══════════════════════════════════════════════════╝${colors.reset}\n`);
        
        await countAll(); 

        console.log(`${colors.yellow}╔══════════════════════════════════════════════════╗`);
        console.log(`║ ✨ Master Seed terminé avec succès !             ║`);
        console.log(`╚══════════════════════════════════════════════════╝${colors.reset}\n`);
        
    } catch (err) {
        console.error(`${colors.red}❌ Erreur critique: ${err.message}${colors.reset}`);
    }
};

runMasterSeed();