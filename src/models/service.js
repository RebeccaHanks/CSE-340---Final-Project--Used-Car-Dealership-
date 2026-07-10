import pool from './db.js';

async function createServiceRequest(serviceData) {
  const {
    account_id,
    vehicle_id,
    service_type,
    description
  } = serviceData;

  const result = await pool.query(
    `INSERT INTO service_requests
    (account_id, vehicle_id, service_type, description)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
    [
      account_id,
      vehicle_id,
      service_type,
      description
    ]
  );

  return result.rows[0];
}

async function getAllServiceRequests() {
  const result = await pool.query(
    `SELECT *
     FROM service_requests
     ORDER BY created_at DESC`
  );

  return result.rows;
}

async function updateServiceRequest(serviceId, status, employeeNotes) {
  const result = await pool.query(
    `UPDATE service_requests
     SET status = $1,
         employee_notes = $2
     WHERE service_id = $3
     RETURNING *`,
    [status, employeeNotes || null, serviceId]
  );

  return result.rows[0];
}

export {
  createServiceRequest,
  getAllServiceRequests,
  updateServiceRequest
};