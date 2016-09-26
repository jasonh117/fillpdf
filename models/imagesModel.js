/**
 * Created by kagek_000 on 8/31/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imagesSchema = new Schema({
   image_path:{
       type: String,
       required: true
   }
});

exports.images = mongoose.model("image", imagesSchema);
