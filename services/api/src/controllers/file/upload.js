const async = require('async');
const { Joi } = require('celebrate');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const handleResponse = require('../../helpers/handleResponse');

const schema = {
	body: Joi.object({
		file: Joi.any(),
	}),
	// query: {
	// 	entity: Joi.string()
	// 		.valid('company')
	// 		.required(),
	// 	nanoId: Joi.string()
	// 		.required(),
	// },
	// Joi.object({
	// 	entity: Joi.string()
	// 		.valid('company'),
	// 	// .required(),
	// 	nanoId: Joi.string(),
	// 	// .required(),
	// }),
};

aws.config.update({
	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
	accessKeyId: process.env.S3_ACCESS_KEY_ID,
	region: process.env.S3_REGION,
});

const s3 = new aws.S3();

const allowedExtensions = ['.jpg', '.jpeg', '.png'];

const upload = multer({
	storage: multerS3({
		s3,
		bucket: process.env.S3_BUCKET_NAME,
		contentType: multerS3.AUTO_CONTENT_TYPE,
		key: (req, file, callback) => {
			const newFileName = `${req.params.nanoId}-${file.originalname}`;
			const fullPath = `public/${req.params.entity}/${newFileName}`;
			callback(null, fullPath);
		},
	}),
	limits: { fileSize: 4 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		const check = allowedExtensions.some(
			(x) => file.originalname.includes(x),
		);
		if (check) cb(null, true);
		else cb(new Error('File Rejected'));
	},
})
	.single('file');

const uploader = (req, res) => new Promise((resolve, reject) => {
	upload(req, res, (err) => {
		if (err) {
			if (err.code === 'LIMIT_FILE_SIZE') {
				reject(new Error(JSON.stringify({
					errorKey: 'handleFile',
					body: { status: 409, data: { message: 'File size cannot be larger than 4MB' } },
				})));
			} else if (err.message === 'File rejected') {
				reject(new Error(JSON.stringify({
					errorKey: 'handleFile',
					body: { status: 409, data: { message: `Only these extensions allowed ${allowedExtensions[req.query.entity].join(', ')}.` } },
				})));
			} else {
				reject(new Error(JSON.stringify({
					errorKey: 'handleFile',
					body: { status: 409, data: { message: 'Some error occurred' } },
				})));
			}
		} else if (!req.file) {
			reject(new Error(JSON.stringify({
				errorKey: 'handleFile',
				body: { status: 409, data: { message: 'File not found' } },
			})));
		}

		resolve(req.file);
	});
});

const request = async (req, res) => {
	async.auto({
		handleFile: [
			async () => {
				const data = await uploader(req, res);
				return {
					message: 'File Uploaded',
					data,
				};
			},
		],
	}, handleResponse(req, res, 'handleFile'));
};

module.exports = { schema, request };
