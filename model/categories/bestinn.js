const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
   
    name: {
        type:String,
        require:true
    },
    dateCreated: {
        type: Date,
        default: Date.now
      },
})

exports.Bestcate = mongoose.model("Bestcategories", categorySchema)
