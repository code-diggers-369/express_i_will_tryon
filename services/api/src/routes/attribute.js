/* eslint-disable no-unused-vars */
const { celebrate } = require('celebrate');
const express = require('express');

const router = express.Router();
const authMW = require('../middleware/auth');

const controller = require('../controllers/attribute');

router.use(authMW);

// POST Attribute create request
router.post('/create', celebrate(controller.create.schema), controller.create.request);

// GET Attribute single get
router.get('/:attributeId', celebrate(controller.main.schema), controller.main.request);

// PUT Attribute edit Entity
router.put('/edit/:attributeId', celebrate(controller.edit.schema), controller.edit.request);

module.exports = router;
