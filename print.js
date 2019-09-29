var express = require('express');
var app = express();
var fs = require('fs');
const SerialPort = require('serialport');
const serialPort = new SerialPort('/dev/tty.usbmodem14101', { baudRate: 19200 });
const Printer = require('thermalprinter');

var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var port = 3000;
var newfiledate = require('./public/js/date.js');
var filename;

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));
app.use(cors());
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.listen(port, function () {
    console.log(port + 'server is open.');
})

// function returnPrint(name) {
//     printer.on('ready', () => {
//         console.log("time to return!");
//         printer.printImage(name).print(function() {
//             console.log('done');
//             resolve(process.exit());
//         });
//     })
// }

// .then(filename=> {
//     console.log(filename + " is generated.");
//     printer.printImage(filename).print(function() {
//         console.log('done');
//         process.exit();
//     });
// })




serialPort.on('open', () => {
    console.log('Serial port open!');
    const printer = new Printer(serialPort, {
        maxPrintingDots: 12,
        heatingTime: 180,
        heatingInterval: 180,
        commandDelay: 0
    });
    printer.on('ready', () => {
        console.log("printer ready");
        app.post('/', function (req, res) {

            new Promise(function (resolve, reject) {
                filename = "./data_imgsave/" + newfiledate.returndate() + ".png";
                if (filename == null) {
                    reject();
                }
                else {
                    fs.writeFile(filename, req.body.valueis, 'base64', function (err) {
                        if (err) {
                            console.log(err);
                            reject();
                        } else {
                            console.log(filename + " written successfully");
                            resolve(filename);
                        }
                    });
                }
            }).then(filename => {
                printer.printImage(filename).print(function () {
                    console.log('done');
                    res.end();
                });
            }).catch(function (err) {
                console.log(err + "is not valid.");
            });

        })
    });
});



