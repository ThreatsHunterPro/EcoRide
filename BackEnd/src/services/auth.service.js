import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isValidEmail, isStrongPassword } from "../utils/validators.js";
import AuthenticationError from "../errors/authentication.error.js";

/**
 * Validates that fields are not empty (User Story 7)
 */
export const validateLoginInput = async (identifier, password) => {
    if (!identifier || !password) {
        throw new AuthenticationError('Identifier and password are required.');
    }
};

/**
 * Compares plain text password with DB hash (Security)
 */
export const verifyPassword = async (plainPassword, hashedPassword) => {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    
    if (!isMatch) {
        throw new AuthenticationError('Invalid credentials.');
    }

    // FIXED: Changed 'password' to 'plainPassword' to match function arguments
    if (!isStrongPassword(plainPassword)) {
        throw new AuthenticationError('Password is not strong enough.');
    }
    
    return true;
};

/**
 * Prepares the response after successful login
 */
export const handleLoginSuccess = (user) => {
    const payload = { 
        id: user.user_id, 
        role_id: user.role_id 
    };

    const token = jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h' }
    );

    return {
        success: true,
        token: token,
        user: user.toJSON()
    };
};