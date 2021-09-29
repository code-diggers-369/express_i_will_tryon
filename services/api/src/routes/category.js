/* eslint-disable no-unused-vars */
const { celebrate } = require('celebrate');
const express = require('express');

const router = express.Router();
const authMW = require('../middleware/auth');

const controller = require('../controllers/category');

router.use(authMW);

// POST Category create request
router.post('/create', celebrate(controller.create.schema), controller.create.request);

// GET Category single get
router.get('/:categoryId', celebrate(controller.main.schema), controller.main.request);

// PUT Category edit Entity
router.put('/edit/:categoryId', celebrate(controller.edit.schema), controller.edit.request);

// GET Category list
router.get('/', celebrate(controller.list.schema), controller.list.request);

module.exports = router;
