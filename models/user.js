var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	// username: String,
	email : String ,
	password: String ,
	phonenum: String,
	directphone: String
	// created_at : String 
}),

User = mongoose.model('user', userSchema);

module.exports = User;
