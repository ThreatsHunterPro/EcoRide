import jwt from 'jsonwebtoken';

export const generateJWT = (user) => {
    return jwt.sign(
        { id: user.user_id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};