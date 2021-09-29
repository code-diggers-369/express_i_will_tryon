/**
 * Calling Dependencies
 */
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
// RequestId and Request IP collectors
const morgan = require('morgan');
const server = require('http').Server(app);
const requestId = require('./helpers/requestId');
const requestIp = require('./helpers/requestIp');

// Logging tools
const logger = require('./helpers/logger/stream');

// MongoDB Connecter
const mongooseConnect = require('./helpers/mongodb');

morgan.token('requestId', (req) => req.meta.requestId);
morgan.token('requestIp', (req) => req.meta.requestIp);

// Routers
const routes = require('./routes');

/**
 * Add service to express app
 */
(async () => {
	/**
     * Async stuff
     */

	// Mongoose Connect
	await mongooseConnect();

	/**
     * Synchronus Stuff
     */
	// Loggin Configurations
	app.use(requestId);
	app.use(requestIp);
	app.use(morgan(':method :url :status :response-time :requestId :requestIp', { stream: logger.stream }));

	// Express Configurations
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());

	// Router Configurations
	app.use(routes);

	server.listen(process.env.API_PORT || 3000);
})();
