/**
 * Created by kagek_000 on 8/31/2016.
 */
 var mongoose = require('mongoose');
 var ObjectId = mongoose.Types.ObjectId;

 var schema = mongoose.Schema({
     _id: {type: mongoose.Schema.Types.ObjectId, default: function () { return new ObjectId()} },
     name: {
       first: String,
       middle: String,
       last: String,
       suffix: String,
     },
     email: {type:String, index: { unique: true}, dropDups: true},
     password: String,
     phone: String,
     address: {
       street: String,
       city: String,
       state: String,
       zip: String
     },
     birthDate: Date,
     profilePic: String,
     documents: [mongoose.Schema.Types.ObjectId],
     driversLicense: Object
 });

 module.exports = mongoose.model("user", schema);
