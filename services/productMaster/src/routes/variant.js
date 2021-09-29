const express = require('express');
const { celebrate } = require('celebrate');

const router = express.Router();

const controller = require('../controllers/variant');

// POST Variant Create
router.post('/create', celebrate(controller.create.schema), controller.create.request);

// GET Variant details
router.get('/:variantId', celebrate(controller.main.schema), controller.main.request);

// GET Product list
router.get('/', celebrate(controller.list.schema), controller.list.request);

// PUT Variant edit
router.put('/edit/:variantId', celebrate(controller.edit.schema), controller.edit.request);

module.exports = router;
