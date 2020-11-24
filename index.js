var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var exec = require('child_process').exec;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);
    var currentTime = new Date().toLocaleString();
    console.log("The IP of the requestor is - " + ip + ' CURRENT TIME: ' + currentTime);
    next();
});

var htmlPath = path.join(__dirname, '/html');
app.use(express.static(htmlPath));


app.get('/discordbot', function(req, res) {
    res.sendStatus(200);
    console.log('get /discordbot');
});

app.post('/discordbot', function(req, res) {
    //verify that the discordbot (payload) is a push from the correct repo
    //verify repository.name == 'wackcoon-device' or repository.full_name = 'DanielEgan/wackcoon-device'
    //console.log(req.body.pusher.name + ' just pushed to ' + req.body.repository.name);
    var pathToRepo = '/GitHub/DiscordBot';

    console.log('Stopping the Bot...');
    exec('pm2 stop 0', execCallback);

    console.log('> Pulling code from GitHub... <');

    // reset any changes that have been made locally
    exec('git -C ' + pathToRepo + ' reset --hard', execCallback);

    // and ditch any files that have been added locally too
    exec('git -C ' + pathToRepo + ' clean -df', execCallback);

    // now pull down the latest
    exec('git -C ' + pathToRepo + ' pull -f', execCallback);

    // and npm install with --production
    exec('npm -C ' + pathToRepo + ' --production', execCallback);

    console.log('Restarting the Bot...');
    exec('pm2 restart 0', execCallback);

});

app.listen(5000, function() {
    var time = new Date().toLocaleString();
    console.log('Today is the: ' + time + ' - And we are listening on port 5000')
});

function execCallback(err, stdout, stderr) {
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
}