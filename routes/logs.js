const express    = require('express');
const router     = express.Router();
const db         = require('../db');
const { quickSort, comparators } = require('../utils/quickSort');
const { binarySearch }           = require('../utils/binarySearch');

router.get('/', async (req, res) => {
  const limit  = parseInt(req.query.limit) || 200;
  const sortBy = req.query.sortBy || 'byDateDesc';

  const orderMap = {
    byDateDesc:     'log_date DESC',
    byDateAsc:      'log_date ASC',
    byQuantityDesc: 'quantity_used DESC',
    byQuantityAsc:  'quantity_used ASC',
  };

  const orderClause = orderMap[sortBy] || 'log_date DESC';

  try {
    const [rows] = await db.query(
      `SELECT * FROM Consumption_Logs ORDER BY ${orderClause} LIMIT ?`,
      [limit]
    );
    res.json({ count: rows.length, data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

router.post('/',
  body('site_id').isInt({ min: 1 }).withMessage('site_id must be a positive integer'),
  body('material_id').isInt({ min: 1 }).withMessage('material_id must be a positive integer'),
  body('quantity_used').isInt({ min: 1 }).withMessage('quantity_used must be at least 1'),
  body('log_date').isDate().withMessage('log_date must be a valid date (YYYY-MM-DD)'),
  body('recorded_by').notEmpty().withMessage('recorded_by is required'),
  validate,
  async (req, res) => {
    const { site_id, material_id, quantity_used, log_date, recorded_by } = req.body;
    try {
      const [r] = await db.query(
        'INSERT INTO Consumption_Logs (site_id,material_id,quantity_used,log_date,recorded_by) VALUES (?,?,?,?,?)',
        [site_id, material_id, quantity_used, log_date, recorded_by]
      );
      res.status(201).json({ log_id: r.insertId, message: 'Log created' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
router.delete('/:id', async (req, res) => {
  try {
    const [r] = await db.query(
      'DELETE FROM Consumption_Logs WHERE log_id=?', [req.params.id]
    );
    if (r.affectedRows === 0)
      return res.status(404).json({ error: 'Log not found' });
    res.json({ message: 'Log deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;