var aws = require('aws-sdk');

// var credentials = new aws.SharedIniFileCredentials({profile: 'default'});
// aws.config.credentials = credentials;

aws.config.update({region: 'us-east-1'});
// aws.config.update({region: 'us-east-1',accessKeyId: 'AKIAITPW4SKI22QZMPCQ', secretAccessKey: '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'});
var sqs = new aws.SQS();

exports.sendMessage = function(message){
	var params = {
	  MessageBody: message, /* required */
	  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/371269713588/myqueue' /* required */

	};
	sqs.sendMessage(params, function(err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else     console.log(data);           // successful response
	});
}