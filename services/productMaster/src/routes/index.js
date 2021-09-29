const router = require('express').Router();

// Require Routes
const product = require('./product');
const category = require('./category');
const attribute = require('./attribute');
const variant = require('./variant');

// Index Routers
router.get('/', (req, res) => {
	res.json(200, { title: 'Welcome to Tryyon API User Master API' });
});

// Sub routes
router.use('/product', product);
router.use('/category', category);
router.use('/attribute', attribute);
router.use('/variant', variant);

module.exports = router;
