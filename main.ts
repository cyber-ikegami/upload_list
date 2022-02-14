const fs = require('fs');
const xlsx = require('xlsx');

const ITEM_START_NUM = 3;

// パス
const dirPath = process.argv[2];
// ファイル名の配列
const fileNameList = fs.readdirSync(dirPath);

fileNameList.forEach((fileName : string) => {
    // エクセルデータ
    const excelData = xlsx.readFile(`${dirPath}/${fileName}`);
    // シート名
    const sheetNames = excelData.SheetNames;
    // 機能名(シート1の名称 - 「フォーマット」)
    const funcName = sheetNames[0].replace('フォーマット', '');

    // 項目名のリスト
    let itemList = new Array();
    // エラーメッセージのリスト
    let errorMessageList = new Array();

    // エラーチェック(シート数の確認)
    if (sheetNames.length <= 1) {
        errorMessageList.push('エラー：シートが1つしか存在しません。');
    } else {
        const itemSheet = excelData.Sheets['入力データ項目'];
        for (let i = ITEM_START_NUM; ; i++){
            const cellNum = `B${i}`;
            if (itemSheet[cellNum] == undefined) {
                break;
            }
            const itemName = itemSheet[cellNum].v;
            itemList.push(`・${itemName}\n`);
        }

        // エラーチェック(入力データ項目のフォーマットの確認)
        if (itemList.length == 0) {
            errorMessageList.push('エラー：フォーマットが違います。');
        }
    }

    console.log(`★ファイル名：${fileName}、機能名：${funcName}
    ------------------------------------------------
    ${errorMessageList.length == 0 ? itemList : errorMessageList}
    ------------------------------------------------\n`.replace(/[ \t\r,]+/g, ''));
});
