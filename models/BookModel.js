const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    title:String,
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Author"
    },
    categoryIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }]
})

module.exports = mongoose.model("Book",BookSchema);