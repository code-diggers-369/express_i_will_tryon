const express = require('express');
const { celebrate } = require('celebrate');

const router = express.Router();

const controller = require('../controllers/supplier');

// POST Supplier Create
router.post('/create', celebrate(controller.create.schema), controller.create.request);

// GET Supplier details
router.get('/:supplierId', celebrate(controller.main.schema), controller.main.request);

// GET Supplier list
router.get('/', celebrate(controller.list.schema), controller.list.request);

module.exports = router;
