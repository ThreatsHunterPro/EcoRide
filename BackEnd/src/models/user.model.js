import { supabase } from "../config/supabase.js";

class User {
  constructor({ user_id, firstname, lastname, email, password, username, role_id, phone, address, birth_date, picture }) {
    this.user_id = user_id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.address = address;
    this.birth_date = birth_date;
    this.picture = picture;
    this.username = username;
    this.role_id = role_id;
  }

  /**
   * Create a new user in Supabase
   */
  static async create({ firstname = '', lastname = '', email, password, username, role_id = 3 }) {
    const { data, error } = await supabase
      .from('users')
      .insert([{ 
        firstname, 
        lastname, 
        email, 
        password, 
        username, 
        role_id, 
      }])
      .select()
      .single();

    if (error || !data) {
        console.error("Supabase Insertion Error:", error?.message);
        return null;
    }
    
    return data ? new User(data) : null;
  }

  /**
   * Find a user by email
   */
  static async findByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error || !data) return null;
    return new User(data);
  }

  /**
   * Find a user by ID
   */
  static async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', id)
      .maybeSingle();

    if (error || !data) return null;
    return new User(data);
  }

  /**
   * Find a user by username
   */
  static async findByUsername(username) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .maybeSingle();

    if (error || !data) return null;
    return new User(data);
  }

  /**
   * Removes sensitive data before sending to the frontend
   */
  toJSON() {
    const { password, ...safeData } = this;
    return safeData;
  }

  static async update(id, userData) {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('user_id', id)
      .select('*')
      .single();

    if (error) throw error;
    return new User(data);
  }
}

export default User;