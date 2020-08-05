const calc = require("./3_module");
const calc2 = require("./3_module2");

console.log(calc.add(1,2));
console.log(calc.sub(1,2));

console.log(calc2.mul(2,3));
console.log(calc2.div(2,3));

cconsole.log(exports === module.exports);