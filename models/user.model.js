mongoose = require("mongoose");

const User = mongoose.model(
    "User", new Schema({
        name: String, 
        email: String,
        password:String,
        role: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Role"
            }
        ]

}));