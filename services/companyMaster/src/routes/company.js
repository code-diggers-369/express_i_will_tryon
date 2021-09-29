const express = require('express');
const { celebrate } = require('celebrate');

const router = express.Router();

const controller = require('../controllers/company');

// POST Company Create
router.post('/create', celebrate(controller.create.schema), controller.create.request);

// GET Company details
router.get('/:companyId', celebrate(controller.main.schema), controller.main.request);

// GET Company list
router.get('/', celebrate(controller.list.schema), controller.list.request);

// PUT Company edit
router.put('/edit/:companyId', celebrate(controller.edit.schema), controller.edit.request);

module.exports = router;
