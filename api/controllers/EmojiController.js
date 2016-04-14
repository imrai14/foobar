/**
 * EmojiController
 *
 * @description :: Server-side logic for managing emojis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var jwt = require('jsonwebtoken');
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
// sails.log.debug("token",token);


module.exports = {
	login : function(req,res){
		if(!req.body || !req.body.username || !req.body.password){
			res.status(400).json({status: 400 , message: "some field(s) missing" });
		}else{
			Emoji.login(req.body.username, req.body.password, function(err, resp){
				if(err){
					res.serverError(err);
				}else{
					req.session.authenticated = true;

					req.session.user = resp;
					var sailsToken = jwt.sign(resp, 'secret', {expiresIn: 3600}); 
					sails.log.debug("req session user- login>>>>>>",req.session.user);
					res.json({status: 200, data: resp, token: sailsToken});
				}
			});
		}

	},
	edit : function(req, res){
		if(!req.body || !req.body.username || !req.body.token){
			res.status(400).json({status: 400 , message: "some field(s) missing" });
		}else{
			Emoji.edit(req.body.username, req.body.token, function(err, resp){
				if(err){
					res.serverError(err);
				}else{
					req.session.authenticated = true;
					req.session.user = resp;
					res.json({status: 200, data: resp});

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
			Emoji.signup(req.body.username,enc, function(err, resp){
				if(err){
					res.serverError(err);
				}else{
					sails.log.debug("res",resp);
					var sailsToken = jwt.sign(resp, 'secret', {expiresIn: 3600}); //1 hour
					// var token = jwt.sign({ resp.username : 'bar' }, 'shhhhh');
					// var sailsToken = jwt.sign(res, 'secret', {expiresIn: 3600}); //1 hour
					res.json({status: 200, data: resp, token: sailsToken});
				}
			});
		}
	}
	
};

