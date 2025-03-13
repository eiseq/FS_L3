const fs = require('fs');

function createDirectory(dirPath, callback) {
    fs.mkdir(dirPath, { recursive: true }, (err) => {
        if (err) {
            console.error(`Ошибка создания директории: ${err.message}`);
            return callback(err);
        }
        callback(null);
    });
}

function createDirectorySync(dirPath) {
    try {
        fs.mkdirSync(dirPath, { recursive: true });
    } catch (err) {
        console.error(`Ошибка создания директории: ${err.message}`);
    }
}

function removeDirectory(dirPath, callback) {
    fs.rm(dirPath, { recursive: true }, (err) => {
        if (err) {
            console.error(`Ошибка удаления директории: ${err.message}`);
            return callback(err);
        }
        callback(null);
    });
}

function removeDirectorySync(dirPath) {
    try {
        fs.rmSync(dirPath, { recursive: true });
    } catch (err) {
        console.error(`Ошибка удаления директории: ${err.message}`);
    }
}

module.exports = {
    createDirectorySync,
    createDirectory,
    removeDirectorySync,
    removeDirectory
};
