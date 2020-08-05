const MusicModel = require("../../models/music")
const mongoose = require("mongoose");

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

// id 유효성 체크
const checkId = (req, res, next) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).end();
    }
    next();
}

// 목록 조회 (localhost:3000/music?limit=3)
// - 성공 : limit 수만큼 music 객체를 담은 객체를 리턴 (200 : OK)
// - 실패 : limit가 숫자형이 아닌경우 (400:Bad request)
const list = (req, res) => {
    const limit = parseInt(req.query.limit || 10, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }   

    // limit 수만큼 music 객체를 담은 배열 리턴
    MusicModel.find((err, result) => {
        if (err) return res.status(500).end(); // 또는 next(err);. 이방법은 app.js의 에러핸들러를 활용함
        // res.json(result);
        res.render("music/list", { result });
    }).limit(limit).sort({ _id: -1 }); // 내림차순
}
// 상세 조회 (/music/:id)
// - 성공 : id에 해당하는 music 객체를 리턴 (200 : Ok)
// - 실패 : 유효한 id가 아닐 경우 (400 : Bad Request)
//          해당하는 id가 없는 경우 (404 : Not Found)

const detail =  (req, res) => {
    const id = req.params.id;
    /*
    // 1. findById 사용
    MusicModel.findById(id, (err, result) => {
        if (err) return res.status(500).end();
        if (!result) return res.status(404).end();
        res.json(result);
    })
    */

    // 2. findOne
    MusicModel.findOne({ _id : id}, (err, result) => {
        if (err) return res.status(500).end();
        if (!result) return res.status(404).end();
        res.render("music/detail", { result });
    })
}
// 등록
// - 성공 : 201을 응답, 배열을 리턴, 201 : Created
// - 실패 : singer, title 값 누락시 400 반환 (400 : Bad Request)

const create = (req, res) => {
    const { singer, title, src } = req.body;
    if (!singer || !title || !src) return res.status(400).end();

    /*
    // 1. Model -> Document 생성
    const music = new MusicModel({singer, title});
    music.save((err, result) => {
        if (err)// return res.status(500).send("Create Error!"); // 500 : internal Server Error
             return res.status(500).end(); // 위에는 직접처리, 얘는 짜여진 로직대로 에러처리
        res.status(201).json(result);
    });
    */

    // 2. Model -> insert
    MusicModel.create({ singer, title, src }, (err, result) => {
        if (err) return res.status(500).end();
        res.status(201).json(result);
    }
    );
}

// 수정 (/music/:id)
// - 성공 : id에 해당하는 music 객체에 데이터를 입력데이터로 수정함
//          해당 객체 반환(200:OK)
// - 실패 : id가 숫자가 아닐경우 (400 : Bad Request)
//          해당하는 id가 없는 경우 (404 : Not Found)
const update = (req, res) => {
    const id = req.params.id;

    const { singer, title,src } = req.body;

    MusicModel.findByIdAndUpdate(id, { singer, title, src }, {new:true}, (err, result) => {
        if (err) return res.status(500).send("수정 중 오류가 발생했습니다");
        if (!result) return res.status(404).send("해당하는 정보가 없습니다");
        res.json(result);
    })
}
// 삭제 (/music/:id)
// - 성공 : id에 해당하는 객체를 삭제하고 삭제 후 결과 배열 리턴 (200 : OK)
// - 실패 : id가 유효하지 않은 경우 (400 : Bad Request)
//          해당하는 id가 없는경우(404 : Not Found)
const remove = (req, res) => {
    const id = req.params.id;

    // 삭제처리 (findByIdAndRemove)
    MusicModel.findByIdAndRemove(id, (err, result) => {
        if (err) return res.status(500).send("삭제 중 오류가 발생했습니다");
        if (!result) return res.status(404).send("값을 찾을 수 없습니다");
        res.json(result);    
    });
}

const showCreatePage = (req, res) => {
    res.render("music/create");
}

const showUpdatePage = (req, res) => {
    const id = req.params.id;
    MusicModel.findById(id, (err, result) => {
        if (err) return res.status(500).send("조회 오류");
        if (!result) return res.status(404).send("해당 정보가 없습니다");
        res.render("music/update", { result });
    })
}

module.exports = { list, detail, create, update, remove, checkId, showCreatePage, showUpdatePage };