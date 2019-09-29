const SerialPort = require('serialport');
// const port = new SerialPort('/dev/cu.usbmodem144101')
// port.write('main screen turn on', function(err) {
//     if (err) {
//         return console.log('Error on write: ', err.message)
//     }
//     console.log('message written')
// })

// // Open errors will be emitted as an error event
// port.on('error', function(err) {
//     console.log('Error: ', err.message)
// })

// SerialPort.list().then(
//     ports => ports.forEach(console.log),
//     err => console.error(err)
// );

const serialPort = new SerialPort('/dev/tty.usbmodem14101', { baudRate: 19200 });
const Printer = require('thermalprinter');
const printer = new Printer(serialPort,{
    maxPrintingDots: 12,
    heatingTime    : 180,
    heatingInterval: 180,
    commandDelay   : 0
});
var imagePath = "./data_imgsave/201909282504.png";
printer.on('ready', () => {
    printer.printImage(imagePath).print(function() {
        console.log('done');
        process.exit();
    });
})