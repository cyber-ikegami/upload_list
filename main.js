const fs = require('fs');

const dirPath = process.argv[2];
const fileNameList = fs.readdirSync(dirPath);

fileNameList.forEach(function(fileName) {
    console.log(`ファイル名：${fileName}`);
});
