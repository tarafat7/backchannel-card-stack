
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hjwwyahfbsimhqtyfsar.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqd3d5YWhmYnNpbWhxdHlmc2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MDQ5NTUsImV4cCI6MjA2MjM4MDk1NX0.ZM_Ndwi8wdhkmN2SNQAs81faFdF-azhMvLu6yfVXEDM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
