import bcrypt from 'bcrypt';
import User from "../models/user.model.js";
import { supabase } from "../config/supabase.js";
import { isPasswordValidLength } from "../utils/validators.js";
import { generateJWT } from "../utils/jwt.js";

const createUser = async (req, res) => {
  try {
    const { email, password, firstname, lastname, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!isPasswordValidLength(password)) {
      return res.status(400).json({ error: 'Password is too short' });
    }

    // 2. Vérification doublons (Indispensable avant création)
    const emailExists = await User.findByEmail(email);
    if (emailExists) return res.status(409).json({ error: 'Email already exists' });

    const usernameExists = await User.findByUsername(username);
    if (usernameExists) return res.status(409).json({ error: 'Username already exists' });

    // 3. Hashage et Insertion
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ 
      firstname, 
      lastname, 
      email, 
      password: hashedPassword, 
      username, 
      role_id: 3, 
    });

    if (!newUser) {
      return res.status(500).json({ error: 'User creation failed' });
    }

    const { error: carError } = await supabase
      .from('cars')
      .insert([{ 
        user_id: newUser.user_id, 
        model: 'À définir',       
        immatriculation: '000-AAA-00', 
        energy_type: 'Non spécifié',
        color: 'Non spécifié',
        brand_id: 1               
      }]);

    if (carError) {
      console.error("Erreur création voiture auto :", carError);
    }

    const token = generateJWT(newUser);
    res.status(201).json({ success: true, user: newUser.toJSON(), token });
  } 
  catch (err) {
    console.error('usersController.create error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUser = async (req, res) => {
  try {
    // On précise explicitement "cars:cars(*)" pour dire : 
    // "Récupère les données de la table 'cars' via la relation et stocke-les dans 'cars'"
    const { data: user, error } = await supabase
      .from('users')
      .select(`
        *,
        cars:cars(*)
      `)
      .eq('user_id', req.userId)
      .single();

    if (error) throw error;
    res.status(200).json(user);
  } catch (err) {
    console.error('Erreur getUser:', err.message);
    res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('usersController.getAllUsers error:', err.message);
    res.status(500).json({ error: 'Error fetching users' });
  }
};

const checkUser = async (req, res) => {
    try {
        const { field, value } = req.query;
        
        let exists = false;
        if (field === 'username') {
            const user = await User.findByUsername(value);
            exists = !!user;
        } else if (field === 'email') {
            const user = await User.findByEmail(value);
            exists = !!user;
        }
        
        res.status(200).json({ exists });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    const { user, car } = req.body;

    const cleanData = (obj) => {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
          key, 
          value === "" ? null : value // Transforme "" en null
        ])
      );
    };

    await supabase.from('users').update(cleanData(user)).eq('user_id', userId);

    if (car) {
      const { data, error } = await supabase
        .from('cars')
        .upsert({ ...car, user_id: userId });
        
      if (error) {
        console.error("ERREUR SUPABASE INSERTION :", error); // TRÈS IMPORTANT
        throw error;
      }
      console.log("Résultat insertion car :", data);
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Erreur BDD :', err.message);
    res.status(500).json({ error: err.message });
  }
};

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
  createUser,
  getUser,
  getAllUsers,
  checkUser,
  updateUser,
  removeUser
};