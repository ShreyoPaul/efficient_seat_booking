const express = require('express');
const router = express.Router();
const { reserveSeatsHandler, resetAllSeats, fetchAllSeats } = require('../controllers/seatsController');
const { authenticate } = require('../utils/authenticate');

router.post('/', authenticate, resetAllSeats)
router.get('/', authenticate, fetchAllSeats);
router.post('/book', authenticate, reserveSeatsHandler);
router.get('/test', (req, res) => {
    res.send('Hello World');
});

module.exports = router;