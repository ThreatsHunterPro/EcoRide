import jwt from 'jsonwebtoken';

/**
 * Génère un JWT à partir d'une instance User
 */
const generateJWT = (user) => {
    return jwt.sign(
        { id: user.user_id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

export default generateJWT;