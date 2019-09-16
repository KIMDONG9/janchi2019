const SerialPort = require('serialport')
const serialPort = new SerialPort('/dev/ttyUSB0', { baudrate: 9600 })
const Printer = require('thermalprinter');

const printer = new Printer(serialPort);

printer.on('ready', () => {
    printer.printImage(imagePath).print();
});