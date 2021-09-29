/* eslint-disable no-unused-vars */
const { celebrate } = require('celebrate');
const express = require('express');

const router = express.Router();
const customerAuthMW = require('../middleware/customerAuth');

const controller = require('../controllers/customer');

// POST user register request
router.post('/register', celebrate(controller.register.schema), controller.register.request);
// POST user login request
router.post('/login', celebrate(controller.login.schema), controller.login.request);

// Authenticated Requests Only
router.use(customerAuthMW);

// GET User single user
router.get('/:userId', celebrate(controller.main.schema), controller.main.request);

module.exports = router;
