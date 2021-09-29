/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();
const { celebrate } = require('celebrate');
const authMW = require('../middleware/auth');

const controller = require('../controllers/file');

router.use(authMW);

// GET file
router.get('/', (req, res) => {
	res.status(200).send({
		message: 'Yodawg',
	});
});

// File Upload Handler
router.post('/upload/:entity/:nanoId', celebrate(controller.upload.schema), controller.upload.request);

module.exports = router;
