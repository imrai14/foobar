/**
* Emoji.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		username:{
			type: 'string'
		},
		password:{
			type: 'string'
		},
		name:{
			type: 'string'
		},
		email:{
			type: 'email'
		}
	},
	login: function(usn, pwd, callback){
		Emoji.findOne({username: usn}).exec(function(err, userResp){
			if(err){
				callback(err, null);
			}else if(userResp){
				sails.log('---->',userResp)
				var hashedPass = pwd;
				var enc = new Buffer(hashedPass).toString('base64');
				Emoji.findOne({password: enc}).exec(function(err, resp){
					if(err){
						callback(err, null);
					}else if(resp){
						callback(null ,resp);
					}else{
						callback({status: 401 , message: "Wrong password"}, null);
					}
				});
			}else{
				callback({status: 401 , message: "user does not exist"}, null);
			}
		});
	},
	edit : function(uUsername, token, callback){
		Emoji.findOne({username:uUsername}).exec(function(err,user){
			if(err){
				callback(err, null);
			}else if(user){
				sails.log('please edit',user);
				callback(null,user);
			}else{
				callback({status: 401 , message: "User Does not exists"}, null);
			}
		});

	},
	userDelete : function(username,cb){
		Emoji.findOne({ username : username}).exec(function(err,user){
			if(err){
				console.log(err);
				cb(err);
			}else if(user){
				Emoji.destroy({username: username}).exec(function(err){
					if(err){
						console.log(err);
						cb(err);
					}else{
						cb(null,'User removed successfully')
					}
				});
			}else{
				console.log('Unable to remove this user');
				cb(null,'Unable to remove this user');
			}
		});
	},

	signup: function(uUsername, uPassword, callback){
		Emoji.findOne({username: uUsername}).exec(function(err, user){
			if(err){
				callback(err, null);
			}else if(user){
				callback({status: 401 , message: "user exists" }, null);
			}else{
				Emoji.create({username:uUsername, password: uPassword}).exec(function(err, resp){
					if(err){
						callback(err, null);
					}else{
						callback(null, resp);
					}
				});
			}
		});
	}
};

