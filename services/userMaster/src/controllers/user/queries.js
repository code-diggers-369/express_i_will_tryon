module.exports = {
	auth: [
		{
			$lookup: {
				from: 'resellers',
				let: { userId: '$_id' },
				pipeline: [
					{ $project: { validAuth: { $in: ['$$userId', '$users'] } } },
					{ $match: { validAuth: true } },
				],
				as: 'reseller',
			},
		},
		{ $unwind: { path: '$reseller', preserveNullAndEmptyArrays: true } },
		{
			$lookup: {
				from: 'retailers',
				let: { userId: '$_id' },
				pipeline: [
					{ $project: { validAuth: { $in: ['$$userId', '$users'] } } },
					{ $match: { validAuth: true } },
				],
				as: 'retailer',
			},
		},
		{ $unwind: { path: '$retailer', preserveNullAndEmptyArrays: true } },
		{
			$lookup: {
				from: 'suppliers',
				let: { userId: '$_id' },
				pipeline: [
					{ $project: { validAuth: { $in: ['$$userId', '$users'] } } },
					{ $match: { validAuth: true } },
				],
				as: 'supplier',
			},
		},
		{ $unwind: { path: '$supplier', preserveNullAndEmptyArrays: true } },
	],
};
