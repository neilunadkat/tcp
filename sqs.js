var aws = require('aws-sdk');

aws.config.update({region: 'us-east-1'});
var sqs = new aws.SQS();

exports.sendMessage = function(message){
	var params = {
	  MessageBody: message, /* required */
	  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/371269713588/deviceTest' /* required */

	};
	sqs.sendMessage(params, function(err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else     console.log(data);           // successful response
	});
}