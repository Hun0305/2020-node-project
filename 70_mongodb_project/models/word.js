const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true, 
  });
autoIncrement.initialize(connection); // id auto-Increment 시작 과정

const WordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique : true
    },
    category : {
        type: String,
        required: true,
        trim: true,
    },
    meaning : {
        type: String,
        required: true,
        trim: true,
        maxlength : 500
    },
    example : {
        type : String,
        trim : true,
        maxlength : 500
    },
    ex_meaning : {
        type : String,
        trim : true,
        maxlength : 500
    },
    username : {
        type : String,
        required : true,
        trim : true,
    }
}); 

WordSchema.plugin(autoIncrement.plugin, "word");
const Word = mongoose.model("word", WordSchema, "word");

module.exports = Word;