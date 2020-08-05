let Friends = [
    {
        no:1,
        name: "강지윤"
    },
    {
        no:2,
        name: "권보성"
    }
]

console.log(Friends[1].name);

let grades = {
    data : {
        kor : 100, mat : 100, eng : 95
    },
    print : function() {
        for (key in this.data) {
            console.log(key + " : " + this.data[key]);
        }
    }
};

grades.print();