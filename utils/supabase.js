// import { createClient } from "@supabase/supabase-js";
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    'https://qzqpdxrveobbvqliyxgw.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6cXBkeHJ2ZW9iYnZxbGl5eGd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0NzE5ODEsImV4cCI6MjAzNTA0Nzk4MX0.ihQsRCoXUKxvMO7qx0Nx0tUJ0EfJpqw2oJKzF_I68Q8'
);

module.exports = supabase;
