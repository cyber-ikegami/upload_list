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

    // エラーチェック(シート数の確認)
    if (sheetName.length <= 1) {
        itemList.push('エラー：シートが1つしか存在しません。');
    } else {
        const itemSheet = excelData.Sheets['入力データ項目'];
        while (true) {
            const cellNum = `B${i}`;
            if (itemSheet[cellNum] == undefined) {
                break;
            }
            const itemName = itemSheet[cellNum].v;
            itemList.push(`・${itemName}\n`);
            i++;
        }
        // エラーチェック(入力データ項目のフォーマットの確認)
        if (itemList.length == 0) {
            itemList.push('エラー：フォーマットが違います。');
        }
    }

    console.log(`★ファイル名：${fileName}、機能名：${funcName}
    ------------------------------------------------
    ${itemList}
    ------------------------------------------------\n`.replace(/[ \t\r,]+/g, ''));
});
