var pathUtil = require('path');

console.log(__dirname);     // 디렉토리 경로
console.log(__filename);    // 파일 경로

var path = __filename;

console.log(pathUtil.dirname(path));	// 디렉토리 경로
console.log(pathUtil.basename(path));	// 파일명 (확장자 포함)
console.log(pathUtil.extname(path));	// 확장자 (. 포함)

var obj = pathUtil.parse(path);
console.log(obj);

console.log(pathUtil.join(obj.dir, obj.base));