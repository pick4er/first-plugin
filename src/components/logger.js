
const defaultName = '{Undefined function}';

function loggerWrap(cbk, name = defaultName) {
  return function logger() {
    console.log(`---> ${name} is going to run`);
    cbk.apply(null, arguments);
    console.log(`<--- ${name} has run`);
  }
}

module.exports = loggerWrap;
