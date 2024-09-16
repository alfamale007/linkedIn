const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.get('/', leadController.getLeads);
router.post('/', leadController.createLead);
router.delete('/:id', leadController.deleteLead);

module.exports = router;
