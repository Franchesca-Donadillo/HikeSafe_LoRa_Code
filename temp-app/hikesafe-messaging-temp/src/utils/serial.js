const SerialPort = require('serialport');

const openSerialPort = (portName, baudRate = 115200) => {
    const port = new SerialPort({
        path: portName,
        baudRate: baudRate,
    });

    return new Promise((resolve, reject) => {
        port.on('open', () => {
            console.log(`Serial port ${portName} opened at ${baudRate} baud.`);
            resolve(port);
        });

        port.on('error', (err) => {
            console.error(`Error opening serial port: ${err.message}`);
            reject(err);
        });
    });
};

const readFromSerialPort = (port) => {
    return new Promise((resolve, reject) => {
        port.on('data', (data) => {
            console.log(`Data received: ${data}`);
            resolve(data);
        });

        port.on('error', (err) => {
            console.error(`Error reading from serial port: ${err.message}`);
            reject(err);
        });
    });
};

const writeToSerialPort = (port, data) => {
    return new Promise((resolve, reject) => {
        port.write(data, (err) => {
            if (err) {
                console.error(`Error writing to serial port: ${err.message}`);
                return reject(err);
            }
            console.log(`Data sent: ${data}`);
            resolve();
        });
    });
};

module.exports = {
    openSerialPort,
    readFromSerialPort,
    writeToSerialPort,
};