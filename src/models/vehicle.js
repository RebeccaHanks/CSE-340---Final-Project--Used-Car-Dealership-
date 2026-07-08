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


async function createVehicle(vehicleData) {
  const {
    category_id,
    year,
    make,
    model,
    price,
    mileage,
    color,
    description,
    image_url
  } = vehicleData;

  const result = await pool.query(
    `INSERT INTO vehicles
    (category_id, year, make, model, price, mileage, color, description, image_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`,
    [
      category_id,
      year,
      make,
      model,
      price,
      mileage,
      color || null,
      description || null,
      image_url || null
    ]
  );

  return result.rows[0];
}

async function updateVehicle(id, vehicleData) {
    const {
        category_id,
        year,
        make,
        model,
        price,
        mileage,
        color,
        description,
        image_url
    } = vehicleData

      const result = await pool.query(
        `UPDATE vehicles
        SET category_id = $1,
            year = $2,
            make = $3,
            model = $4,
            price = $5,
            mileage = $6,
            color = $7,
            description = $8,
            image_url = $9
        WHERE vehicle_id = $10
        RETURNING *`,
        [category_id, year, make, model, price, mileage, color, description, image_url, id]
    );

    return result.rows[0];
}

async function deleteVehicle(id) {
  await pool.query(
    'DELETE FROM vehicles WHERE vehicle_id = $1',
    [id]
  );
}


export {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
};