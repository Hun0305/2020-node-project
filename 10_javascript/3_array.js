const b = [1,2,3,4,5];
const result = b.find((item) => item >= 3);
console.log(result);

const result2 = b.filter((m) => m >= 3);
console.log(result2);

const result3 = b.map(item => item * 2);
console.log(result3);