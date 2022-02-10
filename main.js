const fs = require('fs');
const xlsx = require('xlsx');

// パス
const dirPath = process.argv[2];
// ファイル名の配列
const fileNameList = fs.readdirSync(dirPath);

fileNameList.forEach(fileName => {
    // エクセルデータ
    const excelData = xlsx.readFile(`${dirPath}/${fileName}`);
    // シート名
    const sheetName = excelData.SheetNames;
    // 機能名(シート1の名称 - 「フォーマット」)
    const funcName = sheetName[0].replace('フォーマット', '');

    let itemList = new Array();
    let i = 3;

    const sheet2 = excelData.Sheets[sheetName[1]];
    while (true) {
        const cellNum = `B${i}`;
        if (sheet2[cellNum] == undefined) {
            break;
        }
        const itemName = sheet2[cellNum].v;
        itemList.push(`・${itemName}\n`);
        i++;
    }

    console.log(`★ファイル名：${fileName}、機能名：${funcName}
    ------------------------------------------------
    ${itemList}
    ------------------------------------------------\n`.replace(/[ \t\r,]+/g, ''));
});
