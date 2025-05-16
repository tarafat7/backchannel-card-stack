import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create express app
const app = express();

// Define the static directory
const DIST_DIR = join(__dirname, 'dist');
const HTML_FILE = join(DIST_DIR, 'index.html');

// Serve static files
app.use(express.static(DIST_DIR));

// For any other requests, send the index.html file
app.use((req, res) => {
  res.sendFile(HTML_FILE);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
