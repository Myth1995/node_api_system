
var mongoose = require("mongoose") ;
var Schema  = mongoose.Schema ;

donorSchema = new Schema({

    full_name : {
        type : String ,
        required : true ,
    },
    email : {
        type : String ,
        required : true ,
    },
    amount : {
        type : Number ,
        required : true ,
    },
    reference : {
        type : String ,
        required : true ,
    },

});

Donor = mongoose.model('donor' , donorSchema);

module.exports = Donor ;