/* eslint-disable no-unused-vars */
const { celebrate } = require('celebrate');
const express = require('express');

const router = express.Router();
const authMW = require('../middleware/auth');

const controller = require('../controllers/reseller');

router.use(authMW);

// POST reseller create request
router.post('/create', celebrate(controller.create.schema), controller.create.request);

// GET reseller single get
router.get('/:resellerId', celebrate(controller.main.schema), controller.main.request);

module.exports = router;
