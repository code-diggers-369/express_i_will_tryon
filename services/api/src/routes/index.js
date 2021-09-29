const router = require('express').Router();

// Require Routes
const user = require('./user');
const admin = require('./admin');
const customer = require('./customer');
const company = require('./company');
const file = require('./file');
const reseller = require('./reseller');
const retailer = require('./retailer');
const supplier = require('./supplier');
const product = require('./product');
const attribute = require('./attribute');
const variant = require('./variant');
const category = require('./category');

// Index Routers
router.get('/', (req, res) => {
	res.json(200, { title: 'Express' });
});

// Sub routes
router.use('/user', user);
router.use('/admin', admin);
router.use('/customer', customer);
router.use('/company', company);
router.use('/file', file);
router.use('/reseller', reseller);
router.use('/retailer', retailer);
router.use('/supplier', supplier);
router.use('/product', product);
router.use('/attribute', attribute);
router.use('/variant', variant);
router.use('/category', category);

module.exports = router;
