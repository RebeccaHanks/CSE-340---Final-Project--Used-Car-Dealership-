import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

import pool from './src/models/db.js';
import indexRoutes from './src/routes/index.js';
import accountRoutes from './src/routes/accountRoutes.js';
import vehicleRoutes from './src/routes/vehicleRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home, account, vehicle route
app.use('/', indexRoutes);
app.use('/account', accountRoutes);
app.use('/vehicles', vehicleRoutes);

// pgAdmin Database connection
app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Database connection failed');
  }
});

// 404 page
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// temporary tests
// console.log(process.env.DB_URL);

// pool.query('SELECT NOW()')
//   .then(result => console.log('DB worked:', result.rows[0]))
//   .catch(error => console.error('DB failed:', error));

// app listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});