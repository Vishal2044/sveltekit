// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project details
const SUPABASE_URL = 'https://mncxwxbxtysuzsppodve.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uY3h3eGJ4dHlzdXpzcHBvZHZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0MTc3NzcsImV4cCI6MjA0Njk5Mzc3N30.NDYsnXbYGy0fGr1APTFV1CSKfRjhaoE5yjicyV25uvE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
