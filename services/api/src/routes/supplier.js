/* eslint-disable no-unused-vars */
const { celebrate } = require('celebrate');
const express = require('express');

const router = express.Router();
const authMW = require('../middleware/auth');

const controller = require('../controllers/supplier');

router.use(authMW);

// POST supplier create request
router.post('/create', celebrate(controller.create.schema), controller.create.request);

// GET supplier single get
router.get('/:supplierId', celebrate(controller.main.schema), controller.main.request);

module.exports = router;
