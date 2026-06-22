/* ══════════════════════════════════════════════════════
   DROPLY — api/config.js
   Expone al cliente la URL y la ANON KEY de Supabase, leídas
   desde variables de entorno de Vercel (nunca hardcodeadas).

   La ANON KEY de Supabase está pensada para ser pública: el
   acceso real a los datos lo controla Row Level Security (RLS)
   en la base de datos, no esta clave. No se expone aquí ningún
   secreto (la service_role key NUNCA debe usarse en el cliente).

   Si las variables de entorno no están configuradas todavía,
   se devuelve { supabaseUrl: null, supabaseAnonKey: null } y el
   módulo de cliente (supabase-cloud.js) se desactiva solo, sin
   romper el resto de la app.
══════════════════════════════════════════════════════ */
module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  const supabaseUrl     = process.env.SUPABASE_URL || null;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || null;

  res.status(200).json({ supabaseUrl, supabaseAnonKey });
};