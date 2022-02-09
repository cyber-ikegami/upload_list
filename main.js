const fs = require('fs');

const dirPath = 'C:/Users/ikegami/Desktop/テスト用';
const fileName = fs.readdirSync(dirPath);
console.log(fileName);
