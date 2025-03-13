const fs = require('fs');
const path = require('path');

function listFiles(dirPath, callback) {
    fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(`Ошибка чтения всех файлов директории: ${err.message}`);
            return callback(err);
        }
        files.forEach((file) => {
            const fullPath = path.join(dirPath, file.name);
            if (file.isDirectory()) {
                listAllFilesAsync(fullPath, callback);
            } else {
                console.log(fullPath);
            }
        });
        callback(null);
    });
}

function listFilesSync(dirPath) {
    try {
        const files = fs.readdirSync(dirPath, { withFileTypes: true });
        files.forEach((file) => {
            const fullPath = path.join(dirPath, file.name);
            if (file.isDirectory()) {
                listAllFilesSync(fullPath);
            } else {
                console.log(fullPath);
            }
        });
    } catch (err) {
        console.error(`Ошибка чтения всех файлов директории: ${err.message}`);
    }
}

function cleanProject(dirPath, callback) {
    fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(`Ошибка удаления проекта: ${err.message}`);
            return callback(err);
        }
        files.forEach((file) => {
            const fullPath = path.join(dirPath, file.name);
            if (file.isDirectory()) {
                removeDirectoryAsync(fullPath, callback);
            } else {
                fs.unlink(fullPath, (err) => {
                    if (err) {
                        console.error(`Ошибка удаления файла: ${err.message}`);
                        return callback(err);
                    }
                });
            }
        });
        callback(null);
    });
}

function cleanProjectSync(dirPath) {
    try {
        const files = fs.readdirSync(dirPath, { withFileTypes: true });
        files.forEach((file) => {
            const fullPath = path.join(dirPath, file.name);
            if (file.isDirectory()) {
                removeDirectorySync(fullPath);
            } else {
                fs.unlinkSync(fullPath);
            }
        });
    } catch (err) {
        console.error(`Ошибка очищения проекта: ${err.message}`);
    }
}

module.exports = {
    listFilesSync,
    listFiles,
    cleanProjectSync,
    cleanProject
};
