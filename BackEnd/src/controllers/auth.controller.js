import User from "../models/user.model.js";
import { validateLoginInput, verifyPassword, handleLoginSuccess } from "../services/auth.service.js";
import { isValidEmail } from "../utils/validators.js";
import AuthenticationError from "../errors/authentication.error.js";

/**
 * Handles user authentication (US 1 & 7)
 * Changed to camelCase 'login' to match route configuration.
 */
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    
    // 1. Basic validation (empty fields, etc.)
    await validateLoginInput(identifier, password);

    // 2. Find user by email or username
    let user;
    if (isValidEmail(identifier)) {
      user = await User.findByEmail(identifier);
    } 
    else {
      user = await User.findByUsername(identifier);
    }

    // 3. Check if user exists
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    // 4. Verify hashed password
    await verifyPassword(password, user.password);

    // 5. Generate token and prepare response
    const response = handleLoginSuccess(user);
    
    return res.status(200).json(response);

  } 
  catch (err) {
    console.error('Auth Controller Error =>', err.message);
    const status = err.statusCode || 401;
    
    res.status(status).json({ 
      success: false,
      error: err.message || 'An unexpected error occurred.'
    });
  }
};

export default { 
  login 
};