const express = require('express');
const { celebrate } = require('celebrate');

const router = express.Router();

const controller = require('../controllers/retailer');

// POST Retailer Create
router.post('/create', celebrate(controller.create.schema), controller.create.request);

// GET Retailer details
router.get('/:retailerId', celebrate(controller.main.schema), controller.main.request);

// GET Retailer list
router.get('/', celebrate(controller.list.schema), controller.list.request);

module.exports = router;
