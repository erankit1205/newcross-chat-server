const Message = require("../models/Message");

const getAllMessages = (req, res) => {
    Message.find({username: req.user})
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.json(err);
        });
}

const postMessage = (req, res) => {
    const message = {
        "username" : req.user,
        "message" : req.body.message,
        "timestamp" : (new Date()).toISOString()
    }
    Message.create(message)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.json(err);
        });
}

exports.getAllMessages = getAllMessages;
exports.postMessage = postMessage;