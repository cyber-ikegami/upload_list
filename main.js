const fs = require('fs');

const dirPath = process.argv[2];
const fileNameList = fs.readdirSync(dirPath);
let fileName = "";
for (let i = 0; i < fileNameList.length; i++) {
    fileName = `${fileName}ファイル名：${fileNameList[i]}\n`;
}
console.log(fileName);
