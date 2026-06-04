import bcrypt from 'bcrypt';
import User from "../models/user.model.js";
import { supabase } from "../config/supabase.js";
import { isPasswordValidLength } from "../utils/validators.js";
import generateJWT from "../utils/jwt.js";

/**
 * US 1: User Account Creation (Register)
 */
const create = async (req, res) => {
  try {
    const { email, password, firstname, lastname, username } = req.body;

    // 1. Validation
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!isPasswordValidLength(password)) {
      return res.status(400).json({ error: 'Password is too short' });
    }

    // 2. Password Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Database Insertion
    const newUser = await User.create({ 
      firstname, 
      lastname, 
      email, 
      password: hashedPassword, 
      username, 
      role_id: 3, 
      registration_date: new Date()
    });

    if (!newUser) {
      return res.status(500).json({ error: 'User creation failed' });
    }

    // 4. Response with JWT
    const userJSON = newUser.toJSON();
    const token = generateJWT(newUser);

    res.status(201).json({
      success: true,
      user: userJSON,
      token: token
    });
  } 
  catch (err) {
    console.error('usersController.create error:', err.message);
    res.status(500).json({ error: 'Error during user creation' });
  }
};

/**
 * Get a single user by ID
 */
const getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ success: true, data: user.toJSON() });
  } catch (err) {
    console.error('usersController.getById error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * US 13: List all users (Admin only)
 */
const listAllUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('user_id, firstname, lastname, email, username, registration_date, role_id');

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('usersController.listAllUsers error:', err.message);
    res.status(500).json({ error: 'Error fetching users' });
  }
};

/**
 * US 13: Delete a user account (Admin or Self)
 */
const removeUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;

    res.status(200).json({ success: true, message: 'User deleted' }); 
    
  } catch (err) {
    console.error('usersController.removeUser error:', err.message);
    res.status(500).json({ error: 'Error during deletion' });
  }
};

export default {
  create,
  getById,
  listAllUsers,
  removeUser
};