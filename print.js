const SerialPort = require('serialport')
const serialPort = new SerialPort('/dev/tty.usbmodem14101', { Baudrate: 9600 })
const Printer = require('thermalprinter');
const printer = new Printer(serialPort);

const imagePath = './img/ra.png';
printer.once('ready', () => {
    printer.printImage('./img/ra.png').print();
});