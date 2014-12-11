var util = require('util');
util.puts('Before util puts-timestamp');
util.error('Before util error-timestamp');
util.print('Before util print-timestamp');
util.log('Before util log-timestamp');

console.log('Before console puts-timestamp');
console.error('Before console error-timestamp');
console.warn('Before console print-timestamp');
console.info('Before console log-timestamp');

require('./util-log-timestamp.js')

util.puts('After util puts-timestamp');
util.error('After util error-timestamp');
util.print('After util print-timestamp');
util.log('After util log-timestamp');

console.log('After console puts-timestamp');
console.error('After console error-timestamp');
console.warn('After console print-timestamp');
console.info('After console log-timestamp');