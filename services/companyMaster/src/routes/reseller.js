const express = require('express');
const { celebrate } = require('celebrate');

const router = express.Router();

const controller = require('../controllers/reseller');

// POST Reseller Create
router.post('/create', celebrate(controller.create.schema), controller.create.request);

// GET Reseller details
router.get('/:resellerId', celebrate(controller.main.schema), controller.main.request);

// GET Reseller list
router.get('/', celebrate(controller.list.schema), controller.list.request);

module.exports = router;
