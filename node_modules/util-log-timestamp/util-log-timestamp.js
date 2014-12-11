var util = require('sys');

var funcs = {
  utilFuncs: {
    puts: util.puts.bind(util),
    error: util.error.bind(util),
    print: util.print.bind(util),
    log: util.print.bind(util)
  },
  consoleFuncs: {
    log: console.log.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console)
  }
};


function bind(fn, type, name) {
  Object.keys(funcs[name + 'Funcs']).forEach(function(k) {
    type[k] = function() {
      var s = typeof fn === 'function' ? fn() : fn;
      arguments[0] = util.format(s, arguments[0]);
      funcs[name + 'Funcs'][k].apply(type, arguments);
    };
  });
}

// the default date format to print
function timestamp() {
  return '[' + new Date().toISOString() + '] %s';
}

function patch(fn) {
  bind(fn || timestamp, console, 'console');
  bind(fn || timestamp, util, 'util');
}

patch();

module.exports = patch;

