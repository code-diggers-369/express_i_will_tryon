const axios = require('axios');

const serviceMap = require('./serviceMap');

const requester = {};

Object.keys(serviceMap).forEach((service) => {
	requester[service] = axios.create({
		baseURL: serviceMap[service].baseURL,
		timeout: serviceMap[service].timeout,
	});
});

module.exports = requester;
