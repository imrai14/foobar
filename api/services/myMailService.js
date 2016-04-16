var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user : "raishubham1992@gmail.com",
		pass : "TATADOCOMO14"
	}
});

exports.sendDummyMail = function(data, cb){
	var mailOptions = {
	    // from: 'HR <demo@hr.com>', // sender address
	    // to: 'harsh@mantralabsglobal.com', // list of receivers
	    to: 'raishubham14@gmail.com', //'harsh@mantralabsglobal.com'
	    subject: 'Thanks for Login', // Subject line
	    text: '', // plaintext body
	    html: "<p style='margin:0;font-weight:bold;font-size:12pt;'>Hi,</p><br><p style='margin:0;font-size:12pt;'>Thanks fo login</p><p style='margin:0;font-size:12pt;'>We will contact you soon<span style='margin:0;color:rgb(83,209,48);font-weight:bold;'>Bye</span></p><br><p style='margin:0;font-size:10pt;'>Thanks,</p><p style='margin:0;font-size:10pt;'>Shubham Rai</p>" // html body
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	    	// console.log(mailOptions);
	        console.log('Message sent: ' + info.response);
	        cb(null, info.response);
	    }
	});
}