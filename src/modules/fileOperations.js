const fs = require('fs');
const path = require('path');

function writeFileSync(filePath, data) {
    try {
        fs.writeFileSync(filePath, data);
    } catch (err) {
        console.error(`Ошибка записи файла: ${err.message}`);
    }
}

function writeFile(filePath, data, callback) {
    fs.writeFile(filePath, data, (err) => {
        if (err) {
            console.error(`Ошибка записи файла: ${err.message}`);
            return callback(err);
        }
        callback(null);
    });
}

function readFile(filePath, callback) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Ошибка чтения файла: ${err.message}`);
            return callback(err);
        }
        callback(null, data);
    });
}

function readFileSync(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return data;
    } catch (err) {
        console.error(`Ошибка чтения файла: ${err.message}`);
    }
}

function updateFile(filePath, newData, callback) {
    fs.writeFile(filePath, newData, (err) => {
        if (err) {
            console.error(`Ошибка обновления файла: ${err.message}`);
            return callback(err);
        }
        callback(null);
    });
}

function updateFileSync(filePath, newData) {
    try {
        fs.writeFileSync(filePath, newData);
    } catch (err) {
        console.error(`Ошибка обновления файла: ${err.message}`);
    }
}

function clearFile(filePath, callback) {
    fs.writeFile(filePath, '', (err) => {
        if (err) {
            console.error(`Ошибка очистки файла: ${err.message}`);
            return callback(err);
        }
        callback(null);
    });
}

function clearFileSync(filePath) {
    try {
        fs.writeFileSync(filePath, '');
    } catch (err) {
        console.error(`Ошибка очистки файла: ${err.message}`);
    }
}

function removeNoise(filePath, callback) {
    readFileAsync(filePath, (err, data) => {
        if (err) return callback(err);
        const cleanedData = data.replace(/[0-9]/g, '').toLowerCase();
        writeFileAsync(filePath, cleanedData, callback);
    });
}

function removeNoiseSync(filePath) {
    try {
        const data = readFileSync(filePath);
        const cleanedData = data.replace(/[0-9]/g, '').toLowerCase();
        writeFileSync(filePath, cleanedData);
    } catch (err) {
        console.error(`Ошибка очистки от шума: ${err.message}`);
    }
}

function copyFile(sourcePath, destinationPath, callback) {
    readFileAsync(sourcePath, (err, data) => {
        if (err) return callback(err);
        writeFileAsync(destinationPath, data, callback);
    });
}

function copyFileSync(sourcePath, destinationPath) {
    try {
        const data = readFileSync(sourcePath);
        writeFileSync(destinationPath, data);
    } catch (err) {
        console.error(`Ошибка копирования файла: ${err.message}`);
    }
}

module.exports = {
    writeFileSync,
    writeFile,
    readFileSync,
    readFile,
    updateFileSync,
    updateFile,
    clearFileSync,
    clearFile,
    removeNoiseSync,
    removeNoise,
    copyFileSync,
    copyFile
};
