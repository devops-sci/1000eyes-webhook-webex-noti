const express = require('express');
const router = express.Router();
const axios = require('axios');
const https = require('https');
const httpsAgent = new https.Agent({ rejectUnauthorized: false })

const data = [];

var bot_secret = "pasteyourbotsecret"
var roomid = "pasteyourroomid"


// Post Alert
router.post('/alert', function(req, res) {
    console.log(JSON.stringify(req.body));
    const valami = { "item": "whatever..." };
    res.json(valami);

    sendmsg(req.body)


});

function sendmsg(body){

  var alertmsg = "Unhandled shit happend."

  var eventtype = body['eventType']

  if(eventtype== "WEBHOOK_TEST"){
    alertmsg = "Date: " +  body['eventId'] + " Event type:  " + body['eventType']
  }
  if(eventtype== "ALERT_NOTIFICATION_TRIGGER"){
    alertmsg = "Alert from Thousandeyes! \nTime: " + body['alert']['dateStartZoned'] + "\nMatched rule name:  " + body['alert']['ruleName'] + "\nTarget: " + body['alert']['testTargetsDescription'] +  "\nError type: " + body['alert']['agents'][0]['metricsAtStart'] + "\nError link: " + body['alert']['agents'][0]['permalink']
  }
  if(eventtype== "ALERT_NOTIFICATION_CLEAR"){
    alertmsg = "Alert cleared from Thousandeyes! \nTime: " + body['alert']['dateStartZoned'] + "\nMatched rule name:  " + body['alert']['ruleName'] + "\nTarget: " + body['alert']['testTargetsDescription'] +  "\nCleared solution: " + body['alert']['agents'][0]['metricsAtEnd'] + "\nError link: " + body['alert']['agents'][0]['permalink']
  }


var data = JSON.stringify({
  "roomId": `${roomid}`,
  "text": `${alertmsg}`
});

var config = {
  method: 'post',
  url: 'https://webexapis.com/v1/messages',
  headers: { 
    'Authorization': `Bearer ${bot_secret}`, 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


}




module.exports = router;


