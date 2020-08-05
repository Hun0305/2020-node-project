const singer = {
    name:"퀸",
    members : ["프레디 머큐리", "브라이언 메이", "존 디콘", "로저 테일러"],
    songs : [
        {
            title : "We are the Champions",
            year : 1977
        },
        {
            title : "Radio Ga Ga",
            year : 1984
        }
    ]
};

console.log(singer.members[3]);
console.log(singer.songs[1].title);

// JSON object -> string (http, tcp/ip)
let str = JSON.stringify(singer);
console.log(str);

// string -> JSON obejct
console.log(JSON.parse(str));