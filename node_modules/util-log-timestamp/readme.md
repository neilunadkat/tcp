util-log-timestamp
=============

An enhanced version of [log-timestamp](https://npmjs.org/package/log-timestamp), which provides support for util too.

Prepend timestamps to functions like console.log, console.warn, util.puts, util.warn, util.log etc

Example
-------

``` js

var util = require('util');
util.puts('Before util puts-timestamp');
util.error('Before util error-timestamp');
util.print('Before util print-timestamp');
util.log('Before util log-timestamp');

console.log('Before console puts-timestamp');
console.error('Before console error-timestamp');
console.warn('Before console print-timestamp');
console.info('Before console log-timestamp');

require('util-log-timestamp.js')

util.puts('After util puts-timestamp');
util.error('After util error-timestamp');
util.print('After util print-timestamp');
util.log('After util log-timestamp');

console.log('After console puts-timestamp');
console.error('After console error-timestamp');
console.warn('After console print-timestamp');
console.info('After console log-timestamp');
```

yields

```
Before util puts-timestamp
Befor util error-timestamp
Befor util print-timestamp26 Dec 13:50:27 - Befor util log-timestamp
Before console puts-timestamp
Before console error-timestamp
Before console print-timestamp
Before console log-timestamp
[2013-12-26T08:20:27.357Z] After util puts-timestamp
[2013-12-26T08:20:27.357Z] After util error-timestamp
[2013-12-26T08:20:27.358Z] After util log-timestamp[2013-12-26T08:20:27.358Z] After util print-timestamp[2013-12-26T08:20:27.358Z] After console puts-timestamp
[2013-12-26T08:20:27.358Z] After console error-timestamp
[2013-12-26T08:20:27.358Z] After console print-timestamp
[2013-12-26T08:20:27.358Z] After console log-timestamp
```

You can specify a custom function as well

``` js
require('util-timestamp.js')(function() { return 'date="' + Date.now() + '" message="%s"' });
console.log('hello %s', 'world');
```

yields

```
date="2012-08-23T20:08:37.000Z" message="hello world"
```

Install
------

    npm install util-log-timestamp

License
-------

MIT License