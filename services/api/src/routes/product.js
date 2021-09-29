/* eslint-disable no-unused-vars */
const { celebrate } = require('celebrate');
const express = require('express');

const router = express.Router();
const authMW = require('../middleware/auth');

const controller = require('../controllers/product');

router.use(authMW);

// POST Product create request
router.post('/create', celebrate(controller.create.schema), controller.create.request);

// GET Product single get
router.get('/:productId', celebrate(controller.main.schema), controller.main.request);

// PUT Product edit Entity
router.put('/edit/:productId', celebrate(controller.edit.schema), controller.edit.request);

module.exports = router;
