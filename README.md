# 1000eyes-webhook-webex-noti
Recive the 1000eyes webhook message and send via webex bot. 

This will be make a server on port 5000.
You can make a tunnel with ngrok. 

Start the app: "node index" and start the ngrok : ngrok http 5000 
You will get a ngrok tunnel name and paste to ThousandEyes Webhook. No need any authentication. 
 
 http://<somerandomngroktunnelname>.ngrok.io/api/webhook/alert

Change a two variable in /routes/api/webhook.js 
bot_secret = your webex bot secret which you can use for authentication. 
roomid = your room id, you need in with the boot
