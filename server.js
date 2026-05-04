const express          = require('express');
const cors             = require('cors');
const path             = require('path');
const db               = require('./db');
const materialsRouter  = require('./routes/materials');
const logsRouter       = require('./routes/logs');
const deliveriesRouter = require('./routes/deliveries');

const app  = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/materials',  materialsRouter);
app.use('/api/logs',       logsRouter);
app.use('/api/deliveries', deliveriesRouter);

app.use(express.static(path.join(__dirname, '../constech-frontend/build')));

app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    return res.sendFile(
      path.join(__dirname, '../constech-frontend/build', 'index.html')
    );
  }
  next();
});
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found` });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

db.query('SELECT 1')
  .then(() => console.log('MySQL connected!'))
  .catch(err => console.error('MySQL error:', err.message));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});