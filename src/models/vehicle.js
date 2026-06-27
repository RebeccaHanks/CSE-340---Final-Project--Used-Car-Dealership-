import pool from './db.js';


//getting all vehicle ids
async function getAllVehicles() {
    const result = await pool.query(`
        SELECT *
        FROM vehicles
        ORDER BY vehicle_id
    `);

    return result.rows;
}
// getting all vehicle ids where the id matches first value provided
async function getVehicleById(id) {
    const result = await pool.query(
        'SELECT * FROM vehicles WHERE vehicle_id = $1',
        [id]
    );

    return result.rows[0];
}

export {
  getAllVehicles,
  getVehicleById
};