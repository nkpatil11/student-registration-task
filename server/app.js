// This will run your app in the mode named production
// NODE_ENV=production node app.js

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const app = express();
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressValidator = require('express-validator');

// Connect to database
mongoose.connect(config.mongo.url, config.mongo.options);

// configuration
app.use('/api/files/uploads', express.static('uploads'));
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.use(expressValidator());

// routes
require('./routes')(app);

// Start app
app.listen(config.port, config.ip, function () {
	console.log('🚀 Express app listening on %d, in %s mode', config.port, app.get('env'));
});
