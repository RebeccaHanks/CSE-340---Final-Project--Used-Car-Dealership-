import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';


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

// 404 page
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});