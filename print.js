// const SerialPort = require('serialport')
// const serialPort = new SerialPort('/dev/tty.usbmodem14101', { Baudrate: 9600 })
// const Printer = require('thermalprinter');
// const printer = new Printer(serialPort);

// const imagePath = './img/ra.png';
// printer.once('ready', () => {
//     printer.printImage('./img/ra.png').print();
// });


var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var port = 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

app.listen(port, function () {
    console.log(port + 'server is open.');
})


app.post('/', function(req, res){
    console.log(req.body.valueis);
    res.end();
});