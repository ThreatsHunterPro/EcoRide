import { supabase } from "../config/supabase.js";

const getBrands = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('label', { ascending: true });

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    console.error('Erreur getBrands:', err.message);
    res.status(500).json({ error: 'Échec de récupération des marques' });
  }
};

export default { 
    getBrands
};