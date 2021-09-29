/* eslint-disable no-unused-vars */
const { celebrate } = require('celebrate');
const express = require('express');

const router = express.Router();
const authMW = require('../middleware/auth');

const controller = require('../controllers/variant');

router.use(authMW);

// POST Variant create request
router.post('/create', celebrate(controller.create.schema), controller.create.request);

// GET Variant single get
router.get('/:variantId', celebrate(controller.main.schema), controller.main.request);

// PUT Variant edit Entity
router.put('/edit/:variantId', celebrate(controller.edit.schema), controller.edit.request);

module.exports = router;
