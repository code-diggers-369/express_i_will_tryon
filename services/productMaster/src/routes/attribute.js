const express = require('express');
const { celebrate } = require('celebrate');

const router = express.Router();

const controller = require('../controllers/attribute');

// POST Attribute Create
router.post('/create', celebrate(controller.create.schema), controller.create.request);

// GET Attribute details
router.get('/:attributeId', celebrate(controller.main.schema), controller.main.request);

// GET Product list
router.get('/', celebrate(controller.list.schema), controller.list.request);

// PUT Attribute edit
router.put('/edit/:attributeId', celebrate(controller.edit.schema), controller.edit.request);

module.exports = router;
