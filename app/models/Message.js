const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessageSchema = new Schema(
    {
        "username": {
            type: String,
            require: true
        },
        "timestamp": {
            type: Date,
            required: true
        },
        "message": {
            type: String,
            required: true
        }
    }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;