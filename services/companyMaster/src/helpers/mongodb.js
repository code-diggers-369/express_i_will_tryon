/**
 * @module MongoDB
 * @description Connects to MongoDB server and reconnects in case of dissconnection
 *
 * @requires {@link https://www.npmjs.com/package/mongoose|mongoose}
 *
 * @requires Logger~logger
 *
 * @category Helpers
 */

const mongoose = require('mongoose');

const logger = require('./logger');

const protocol = process.env.MONGODB_PROTOCOL || 'mongodb';
const host = process.env.MONGODB_HOST || 'localhost:27017';
const db = process.env.MONGODB_DB || 'tryyon';
const options = process.env.MONGODB_OPTIONS ? `?${process.env.MONGODB_OPTIONS}` : '';

const user = process.env.MONGODB_USER;
const pass = process.env.MONGODB_PASS;
const auth = (user && pass) ? `${user}:${pass}@` : '';

const dbURI = `${protocol}://${auth}${host}/${db}${options}`;

/**
  * @constant
  * @type {Object}
  * @property {String} category - Module Category
  * @property {String} module - Module name
  * @description Meta for logger
  */
const meta = { module: 'MONGO' };

/**
  * @function module:MongoDB.connect
  * @description To be only called once in service index file to initiate connection with DB server reconnects in 5 secs in case of disconnect
  *
  * @fires connected
  * @fires disconnected
  */
const connect = () => mongoose.connect(dbURI, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

/**
  * @event MongoDBDisconnect
  * @description Logs when disconnected. event string: "disconnected"
  * @category Helpers
  */
mongoose.connection.on('disconnected', (error) => {
	logger.log('error', 'Disconnected', { ...meta, error });
});

/**
  * @event MongoDBConnect
  * @description Logs when connected. event string: "connected"
  * @category Helpers
  */
mongoose.connection.on('connected', () => {
	logger.log('info', 'Connected', meta);
});

module.exports = connect;
