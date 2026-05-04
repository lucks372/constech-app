const express                          = require('express');
const router                           = express.Router();
const db                               = require('../db');
const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Materials');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/',
  body('material_name').notEmpty().withMessage('material_name is required'),
  body('unit').notEmpty().withMessage('unit is required'),
  body('unit_cost').isFloat({ min: 0 }).withMessage('unit_cost must be a positive number'),
  validate,
  async (req, res) => {
    const { material_name, unit, unit_cost } = req.body;
    try {
      const [r] = await db.query(
        'INSERT INTO Materials (material_name,unit,unit_cost) VALUES (?,?,?)',
        [material_name, unit, unit_cost]
      );
      res.status(201).json({ material_id: r.insertId, material_name, unit, unit_cost });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
router.put('/:id',
  param('id').isInt().withMessage('ID must be an integer'),
  body('material_name').notEmpty().withMessage('material_name is required'),
  body('unit').notEmpty().withMessage('unit is required'),
  body('unit_cost').isFloat({ min: 0 }).withMessage('unit_cost must be a positive number'),
  validate,
  async (req, res) => {
    const { material_name, unit, unit_cost } = req.body;
    try {
      const [r] = await db.query(
        'UPDATE Materials SET material_name=?,unit=?,unit_cost=? WHERE material_id=?',
        [material_name, unit, unit_cost, req.params.id]
      );
      if (r.affectedRows === 0)
        return res.status(404).json({ error: 'Material not found' });
      res.json({ message: 'Material updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
router.delete('/:id',
  param('id').isInt().withMessage('ID must be an integer'),
  validate,
  async (req, res) => {
    try {
      const [r] = await db.query(
        'DELETE FROM Materials WHERE material_id=?', [req.params.id]
      );
      if (r.affectedRows === 0)
        return res.status(404).json({ error: 'Material not found' });
      res.json({ message: 'Material deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;