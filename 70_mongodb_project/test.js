
var getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var n1 = getRandomInt(0, 9);
var n2 = getRandomInt(0, 9);
var n3 = getRandomInt(0, 9);

console.log(n1, n2, n3);