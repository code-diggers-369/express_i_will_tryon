const express = require('express');
const { celebrate } = require('celebrate');

const router = express.Router();

const controller = require('../controllers/category');

// POST Category Create
router.post('/create', celebrate(controller.create.schema), controller.create.request);

// GET Category details
router.get('/:categoryId', celebrate(controller.main.schema), controller.main.request);

// PUT Category edit
router.put('/edit/:categoryId', celebrate(controller.edit.schema), controller.edit.request);

// GET Category lsit
router.get('/', celebrate(controller.list.schema), controller.list.request);

module.exports = router;
