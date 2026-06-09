import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_KEY;

if (!url || !key)
{
    throw new Error('Variables d\'environnement Supabase manquantes !');
}

export const supabase = createClient(url, key);