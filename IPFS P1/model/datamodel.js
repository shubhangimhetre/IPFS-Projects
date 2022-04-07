const mongoose=require('mongoose')
Schema = mongoose.Schema;

var dataSchema = new Schema({
    fileName : { type: String},
    fileHash : { type: String}
},{timestamps:true});

module.exports=mongoose.model('data',dataSchema)