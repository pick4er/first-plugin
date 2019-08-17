const logger = require('./components/logger');
const sayHi = require('./components/sayHi');

const loggedHi = logger(sayHi);
loggedHi();
