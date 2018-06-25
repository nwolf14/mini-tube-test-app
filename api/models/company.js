const mongoose = require('mongoose');

let CompanySchema = mongoose.Schema({
	name: {type: String},
	users: [ 
		{user: 
			{
				type: mongoose.Schema.ObjectId, 
				ref: 'User'
			},
			permissions: [{type: String}]
		}
	]
}, {timestamp: true});

CompanySchema.methods.toWeb = function() {
	let json = this.toJSON();
	json.id = this._id;
	return json;
}

let company = module.exports = mongoose.model('Company', CompanySchema);