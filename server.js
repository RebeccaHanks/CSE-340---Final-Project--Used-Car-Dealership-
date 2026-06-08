import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

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

// Home route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Hanks Auto Sales'
  });
});

// Temporarily testing this route
app.get('/health', (req, res) => {
  res.send('Used Car Dealership app is running');
});

// 404 page
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});