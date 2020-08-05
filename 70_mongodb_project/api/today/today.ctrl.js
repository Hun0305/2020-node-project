const TodayModel = require("../../models/today");
const WordModel = require("../../models/word");
const { set } = require("mongoose");
/*
minNum, maxNum / n1, n2, n3를 today DB에 저장
minNum은 0 고정일거같고, maxNum은 단어 추가될때마다 추가된 단어의 _id로 today DB maxNum을 교체
n1, n2, n3는 오늘 날짜만 받아오는 메소드나 클래스를 찾아보자. 그리고 checkAuth?에 비교하는 함수 계속 넣어서 날짜 다르면 n1, n2, n3를 교체하도록 하자
Math.Random, Math.Floor 사용
이거 바꾸는 파일은 어디다가 할까

exports해서 단어 추가될때마다 maxNum 바꾸고.
4,5는 데이터를 삭제시켜 버려서, 랜덤돌렸을때 4,5뜨면 다시돌리게 하자.
*/

let today = new Date();

// today의 _id : 5f091384c9d5bf489c0b8617

var getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var updateDate = () => {
    TodayModel.findByIdAndUpdate({ _id : "5f091384c9d5bf489c0b8617" }, { date : today.getDate() }, (err, result) => {
        if (err) console.log("date 변경 중 오류");
    })
}

var updateMaxNum = (inputMaxNum) => {
    TodayModel.findByIdAndUpdate({ _id : "5f091384c9d5bf489c0b8617" }, { maxIndex : inputMaxNum }, (err, result) => {
        if (err) console.log("maxIndex 변경 중 오류");
    })
};

var updateIndex = () => {
    var n1, n2, n3;
    var minNum, maxNum;

    TodayModel.findOne({_id : "5f091384c9d5bf489c0b8617" }, (err, result) => {
        if (err) console.log("updateIndex에서 에러발생");
        if (result) {
            minNum = result.minIndex;
            maxNum = result.maxIndex;
            // console.log("타입 : " + typeof minNum, typeof maxNum, minNum, maxNum);
        }
    })
    
    setTimeout(function() { // DB 값 할당이 비동기식으로 진행돼서, minNum이 할당되기 전에 값을 찾으러 들어가서 의도적으로 지연시간을 줌.
        // console.log("타입2 : " + typeof minNum, typeof maxNum, minNum, maxNum)
        do {
            n1 = getRandomInt(minNum, maxNum) / 10; // 이유모르게 이값이 다른 파일에서 돌려보면 한자리수가 잘 나오는데, 여기선 10이 곱해진 상태로 나옴.
            n2 = getRandomInt(minNum, maxNum) / 10;
            n3 = getRandomInt(minNum, maxNum) / 10;
    
            // console.log(n1, n2, n3);
        } while (n1 == 4 || n1 == 5 || n2 == 4 || n2 == 5 || n3 == 4 || n3 == 5 || n1==23 || n2==23 || n3 == 23 || n1 == 24 || n2 == 24 || n3 == 24 || n1==25 || n2==25 || n3 == 25 || n1 == 27 ||n2 ==27|| n3==27 || n1 == 55|| n2 == 55 || n3 == 55 || n1 == 58 || n2 == 58 || n3 == 58 || n1 >= n2 || n2 >= n3 || n1 >= n3)
        // 내 컴퓨터의 DB엔 위 값들이 들어가지않아서 예외처리를 둠.

        TodayModel.findByIdAndUpdate({ _id : "5f091384c9d5bf489c0b8617" }, { I1 : n1 }, (err, result) => {
            if (err) console.log("I1 변경 중 오류");
        })

        TodayModel.findByIdAndUpdate({ _id : "5f091384c9d5bf489c0b8617" }, { I2 : n2 }, (err, result) => {
            if (err) console.log("I2 변경 중 오류");
        })

        TodayModel.findByIdAndUpdate({ _id : "5f091384c9d5bf489c0b8617" }, { I3 : n3 }, (err, result) => {
            if (err) console.log("I3 변경 중 오류");
        });
    }, 100);    
};

const showTodayList = (req, res) => {
    let todaydate;
    TodayModel.findOne({ _id : "5f091384c9d5bf489c0b8617" }, (err, result) => {
        if (err) console.log("date 값 찾는데 오류 발생");
        todaydate=result;
    })

    let i1, i2, i3;
    TodayModel.findOne({ _id : "5f091384c9d5bf489c0b8617" }, (err, result) => {
        if (err) return res.status(500).end("인덱스 추출 중 오류 발생");
        i1 = result.I1;
        i2 = result.I2;
        i3 = result.I3;
        // console.log(i1, i2, i3);
    });

    let result1, result2, result3;
    setTimeout(function() {
        WordModel.findOne({ _id : i1 }, (err, result) => {
            if (err) return res.status(500).end("result1 추출 중 오류 발생");
            result1 = result;            
        });
    
        WordModel.findOne({ _id : i2 }, (err, result) => {
            if (err) return res.status(500).end("result2 추출 중 오류 발생");
            result2 = result;
        });
    
        WordModel.findOne({ _id : i3 }, (err, result) => {
            if (err) return res.status(500).end("result3 추출 중 오류 발생");
            result3 = result;
        });
    }, 100);
    
    setTimeout(function() {
        res.render("word/todaylist", { todaydate, result1, result2, result3 });
    }, 1000);
}

module.exports = { updateDate, updateIndex, updateMaxNum, showTodayList};