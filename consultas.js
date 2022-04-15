// Importar módulos necesarios
const { Pool } = require('pg');

// Crear nueva instancia de la clase Pool, con objeto de configuración
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "Nick1212",
    database: "softlife",
    port: 5432,
});

// INSERTAR USUARIO
const insertar = async (datos) => {
    const values = Object.values(datos);
    const consulta = {
        text: 'INSERT INTO usuarios (email, password) VALUES ($1, $2)',
        values
    };
    try {
        const result = await pool.query(consulta);
        return result;
    } catch (error) {
        throw error;
    }
};


// CONSULTAR USUARIOS
const consultar = async () => {
    try {
        const result = await pool.query('SELECT email, password FROM usuarios');
        return result.rows;
    } catch (error) {
        throw error;
    }
};

// VALIDAR USUARIO
const validar = async (datos) => {
    const values = Object.values(datos)
    const consulta = {
        text: 'SELECT COUNT (*) FROM usuarios WHERE email = $1 AND password = $2',
        values
    };
    try {
        const result = await pool.query(consulta);
        return result;
    } catch (error) {
        throw error;
    }
};

// EXPORTANDO FUNCIONES
module.exports = { insertar, consultar, validar};
