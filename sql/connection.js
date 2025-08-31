const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Render te proporciona esta variable
  ssl: {
    rejectUnauthorized: false // necesario en Render para conexiones seguras
  }
});

async function getConnection() {
  try {
    const client = await pool.connect();
    console.log(`Conexión exitosa a PostgreSQL`);
    return client;
  } catch (err) {
    console.error('Error al conectar con PostgreSQL:', err);
    throw err;
  }
}

module.exports = {
  getConnection,
  pool
};
