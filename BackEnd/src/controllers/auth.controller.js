import User from "../models/user.model.js";
import { validateLoginInput, verifyPassword, handleLoginSuccess } from "../services/auth.service.js";
import { isValidEmail } from "../utils/validators.js";
import AuthenticationError from "../errors/authentication.error.js";

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    
    await validateLoginInput(identifier, password);

    let user;
    if (isValidEmail(identifier)) {
      user = await User.findByEmail(identifier);
    } 
    else {
      user = await User.findByUsername(identifier);
    }

    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    await verifyPassword(password, user.password);
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