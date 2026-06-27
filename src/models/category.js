import pool from './db.js';

// Getting all categories ordered by name
async function getAllCategories() {
  const result = await pool.query(`
    SELECT *
    FROM categories
    ORDER BY category_name
  `);

  return result.rows;
}

export {
  getAllCategories
};