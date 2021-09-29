const router = require('express').Router();

// Require Routes
const company = require('./company');
const reseller = require('./reseller');
const retailer = require('./retailer');
const supplier = require('./supplier');

// Index Routers
router.get('/', (req, res) => {
	res.json(200, { title: 'Welcome to Tryyon Company Master API' });
});

// Sub routes
router.use('/company', company);
router.use('/reseller', reseller);
router.use('/retailer', retailer);
router.use('/supplier', supplier);

module.exports = router;
