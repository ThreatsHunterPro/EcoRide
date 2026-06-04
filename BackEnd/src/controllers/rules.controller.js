import rules from "../config/rules.js";

/**
 * Retrieves the application's business rules (US 1)
 * Renamed to getRules to match the dynamic router configuration.
 */
const getRules = (req, res) => {
    return res.json({
        appName: 'EcoRide',
        ...rules
    });
};

export default { getRules };