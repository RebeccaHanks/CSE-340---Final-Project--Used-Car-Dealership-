import pool from './db.js';

async function getAccountByEmail(email) {
    const result = await pool.query(
        'SELECT * FROM accounts WHERE email = $1',
        [email]
    );
    return result.rows[0];
}

async function createAccount(
    firstName,
    lastName,
    email,
    password,
    role = 'customer'
) {
    const result = await pool.query(
        `INSERT INTO accounts
        (first_name, last_name, email, password, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [firstName, lastName, email, password, role]
    );
    return result.rows[0];
}

export {
    getAccountByEmail,
    createAccount
};