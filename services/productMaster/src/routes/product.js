const express = require('express');
const { celebrate } = require('celebrate');

const router = express.Router();

const controller = require('../controllers/product');

// POST Product Create
router.post('/create', celebrate(controller.create.schema), controller.create.request);

// GET Product details
router.get('/:productId', celebrate(controller.main.schema), controller.main.request);

// GET Product list
router.get('/', celebrate(controller.list.schema), controller.list.request);

// PUT Product edit
router.put('/edit/:productId', celebrate(controller.edit.schema), controller.edit.request);

module.exports = router;
