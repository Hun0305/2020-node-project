function add(a,b) {
    let sum = a + b;
    return sum;
}

function print(result) {
    console.log(result);
}

print(add(2,3));

function add2(a, b, callback) {
    let sum = a + b;
    callback(sum);
    return sum;
}

add2(2,3, print);

// add2(2,3 (result) => console.log(result));