let n1 = "펭", n2 = "수";

let name = "My name is " + n1 + " " + n2 + ".";
console.log (name);

let name2 = `My name is ${n1} ${n2}.`;
console.log(name2);

function print(a) {
    console.log(a);
}

var print2 = (function (a) {
    console.log(a)
})(1);

((a) => console.log(a))(2);
((a,b) => console.log(a+b))(1,2);