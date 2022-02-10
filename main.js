const fs = require('fs');
const xlsx = require('xlsx');

// パス
const dirPath = process.argv[2];
// ファイル名の配列
const fileNameList = fs.readdirSync(dirPath);

fileNameList.forEach(fileName => {
    const excelData = xlsx.readFile(`${dirPath}/${fileName}`);
    const sheetName = excelData.SheetNames;
    const funcName = sheetName[0].replace('フォーマット', '');
    console.log(`ファイル名：${fileName}、機能名：${funcName}`);
});
