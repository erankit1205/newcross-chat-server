const express = require('express');
const router = express.Router();
const messageService = require("../services/message-service")

router.post('/', function(req, res){
   messageService.postMessage(req, res);
});

router.get('/', function(req, res){
    messageService.getAllMessages(req, res);
 });
module.exports = router;