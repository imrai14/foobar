/**
 * EmojiController
 *
 * @description :: Server-side logic for managing emojis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var jwt = require('jsonwebtoken');

// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
// sails.log.debug("token",token);
var token;

module.exports = {
	login : function(req,res){
		if(!req.body || !req.body.username || !req.body.password){
			res.status(400).json({status: 400 , message: "some field(s) missing" });
		}else{
			token = makeid();
			Emoji.login(req.body.username, req.body.password, function(err, resp){
				if(err){
					res.serverError(err);
				}else{
					// var xxx = 'raishubham14@gmail.com';
					// myMailService.sendDummyMail(xxx,function(err, response){
					// 	if(err)
					// 		sails.log.debug('err>>>>',err);
					// 	else{
					// 		sails.log.debug('mail sent successfully'+response);
					// 		// res.status(200);
					// 	}
					// });
					req.session.authenticated = true;
					req.session.user = resp;
					sails.log('token',token)
					res.json({status: 200, data: resp, token: token});
				}
			});
		}

	},
	edit : function(req, res){
		sails.log('token------->',token)
		if(!req.body || !req.body.username || !req.body.token){
			res.status(400).json({status: 400 , message: "some field(s) missing" });
		}else{
			Emoji.edit(req.body.username, req.body.token, function(err, resp){
				if(err){
					res.serverError(err);
				}else{
					sails.log('resp username------->',resp.username)
					if(req.body.token == token){
						req.session.authenticated = true;
						req.session.user = resp;
						delete resp.password;
						delete resp.createdAt;
						delete resp.updatedAt;
						res.json({status: 200, data: resp});
					}else{
						res.json({token : 'invalid'})
					}

				}
			});
		}
	},
	signUp: function(req, res){
		if(!req.body || !req.body.username || !req.body.password){
			res.badRequest('Please provide things in this');
		}else{
			var hashedPass = req.body.password;
			var enc = new Buffer(hashedPass).toString('base64');
			sails.log('enc----->',enc)
			token = makeid();
			Emoji.signup(req.body.username,enc, function(err, resp){
				if(err){
					res.serverError(err);
				}else{
					sails.log.debug("res",resp);
					res.json({status: 200, data: resp, token: token});
				}
			});
		}
	},

	deleteUser: function(req, res){
		if(!req.body || !req.body.username){
			res.badRequest('no userId specified to delete. Please specify one');
		}else{
			Emoji.userDelete(req.body.username, function(err,message){
				if(err)
					res.serverError(err);
				else
					res.send(message);
			});
		}
	}
	
};
var makeid =  function (){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 30; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

