/* eslint-disable no-unused-vars */
const { celebrate } = require('celebrate');
const express = require('express');

const router = express.Router();
const authMW = require('../middleware/auth');

const controller = require('../controllers/company');

router.use(authMW);

// POST company create request
router.post('/create', celebrate(controller.create.schema), controller.create.request);

// GET compnay single get
router.get('/:companyId', celebrate(controller.main.schema), controller.main.request);

// PUT Company edit Entity
router.put('/edit/:companyId', celebrate(controller.edit.schema), controller.edit.request);

module.exports = router;
