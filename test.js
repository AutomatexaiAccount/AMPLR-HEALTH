import { supabase } from './src/lib/supabase.js';
async function test() {
  const { data, error } = await supabase.from('bookings').select('*').limit(1);
  console.log('Bookings columns:', Object.keys(data[0] || {}));
  process.exit(0);
}
test();
