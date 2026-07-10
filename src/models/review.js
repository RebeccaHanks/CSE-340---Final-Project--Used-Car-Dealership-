import pool from './db.js';

export async function createReview(
  accountId,
  vehicleId,
  rating,
  comment
) {
  const result = await pool.query(
    `INSERT INTO reviews
      (account_id, vehicle_id, rating, comment)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [
      accountId,
      vehicleId,
      rating,
      comment
    ]
  );

  return result.rows[0];
}

export async function getReviewsByVehicle(vehicleId) {
  const result = await pool.query(
    `SELECT
       reviews.*,
       accounts.first_name,
       accounts.last_name
     FROM reviews
     LEFT JOIN accounts
       ON reviews.account_id = accounts.account_id
     WHERE reviews.vehicle_id = $1
     ORDER BY reviews.created_at DESC`,
    [vehicleId]
  );

  return result.rows;
}

export async function deleteReview(reviewId) {
  const result = await pool.query(
    `DELETE FROM reviews
     WHERE review_id = $1
     RETURNING *`,
    [reviewId]
  );

  return result.rows[0];
}