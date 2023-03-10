const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name : String,
    country : String,
    state : String,
    email : String,
    addresses : [
        {
            street_name : String,
            city : String,
            state : String,
            country : String,
            contact_no : String
        }
    ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User