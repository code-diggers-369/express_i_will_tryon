const router = require('express').Router();

// Require Routes
const user = require('./user');
const admin = require('./admin');
const customer = require('./customer');

// Index Routers
router.get('/', (req, res) => {
	res.json(200, { title: 'Welcome to Tryyon API User Master API' });
});

// Sub routes
router.use('/user', user);
router.use('/admin', admin);
router.use('/customer', customer);

module.exports = router;
