/* eslint-disable no-unused-vars */
const { celebrate } = require('celebrate');
const express = require('express');

const router = express.Router();
const authMW = require('../middleware/auth');

const controller = require('../controllers/retailer');

router.use(authMW);

// POST retailer create request
router.post('/create', celebrate(controller.create.schema), controller.create.request);

// GET retailer single get
router.get('/:retailerId', celebrate(controller.main.schema), controller.main.request);

module.exports = router;
