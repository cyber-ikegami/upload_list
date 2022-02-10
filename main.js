const fs = require('fs');
const xlsx = require('xlsx');

// パス
const dirPath = process.argv[2];
// ファイル名の配列
const fileNameList = fs.readdirSync(dirPath);

fileNameList.forEach(fileName => {
    const excelData = xlsx.readFile(fileName);
    const sheetName = excelData.SheetNames;
    console.log(`ファイル名：${fileName}、機能名：${sheetName}`);
});
