const express = require('express');
const alumnoController = require('../controllers/alumnoController');

const router = express.Router();

router.param('id', (req, res, next, id) => {
  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) {
    return res.status(400).json({ error: 'El ID no es válido.' });
  }
  return next();
});

router.get('/', alumnoController.index);
router.get('/:id', alumnoController.show);
router.post('/', alumnoController.store);
router.put('/:id', alumnoController.update);
router.delete('/:id', alumnoController.destroy);

module.exports = router;
