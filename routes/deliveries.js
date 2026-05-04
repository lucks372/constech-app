const express = require('express');
const router  = express.Router();
const queue   = require('../utils/queue');

router.post('/', (req, res) => {
  const { site_id, material_id, quantity_requested, notes } = req.body;

  if (!site_id || !material_id || !quantity_requested) {
    return res.status(400).json({
      error: 'Missing required fields: site_id, material_id, quantity_requested'
    });
  }
  if (isNaN(quantity_requested) || quantity_requested <= 0) {
    return res.status(400).json({
      error: 'quantity_requested must be a positive number'
    });
  }

  const entry = queue.enqueue({ site_id, material_id, quantity_requested, notes });
  res.status(201).json({ message: 'Added to queue', entry });
});

router.get('/', (req, res) => {
  res.json({ size: queue.size(), requests: queue.getAll() });
});

router.delete('/process', (req, res) => {
  const done = queue.dequeue();
  if (!done) return res.status(404).json({ message: 'Queue is empty' });
  res.json({ message: 'Processed', done });
});

module.exports = router;