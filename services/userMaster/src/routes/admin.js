/* eslint-disable no-unused-vars */
const { celebrate } = require('celebrate');
const express = require('express');

const router = express.Router();
const adminAuthMW = require('../middleware/adminAuth');

const controller = require('../controllers/admin');

// POST user register request
router.post('/register', celebrate(controller.register.schema), controller.register.request);
// POST user login request
router.post('/login', celebrate(controller.login.schema), controller.login.request);

// Authenticated Requests Only
router.use(adminAuthMW);

// GET User token verification (accepts no body)
router.get('/check', celebrate(controller.check.schema), controller.check.request);

// GET User single user
router.get('/:adminId', celebrate(controller.main.schema), controller.main.request);

module.exports = router;
