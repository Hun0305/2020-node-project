const MovieModel = require("../../models/movie")
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
const list = (req, res) => {
    const limit = parseInt(req.query.limit || 10, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }   
    // limit 수만큼 music 객체를 담은 배열 리턴
    MovieModel.find((err, result) => {
        if (err) return res.status(500).end(); // 또는 next(err);. 이방법은 app.js의 에러핸들러를 활용함
        // res.json(result);
        res.render("movie/list", { result });
    }).limit(limit).sort({ _id: -1 }); // 내림차순
}

// 상세 조회 (/music/:id)
const detail =  (req, res) => {
    const id = req.params.id;
    // findById 사용
    MovieModel.findById(id, (err, result) => {
        if (err) return res.status(500).end();
        if (!result) return res.status(404).end();
        res.render("movie/detail", { result });
    })
}

// 등록
const create = (req, res) => {
    const { title, director, year, src } = req.body;
    if (!title || !director || !year || ! src) return res.status(400).end();

    // 1. Model -> Document 생성
    const movie = new MovieModel({title, director, year, src});
    movie.save((err, result) => {
        if (err)
             return res.status(500).send("등록 오류 발생");
        res.status(201).json(result);
    });
}

// 수정 (/music/:id)
const update = (req, res) => {
    const id = req.params.id;

    const { title, director, year, src } = req.body;

    MovieModel.findByIdAndUpdate(id, { title, director, year, src }, {new:true}, (err, result) => {
        if (err) return res.status(500).send("수정 중 오류가 발생했습니다");
        if (!result) return res.status(404).send("해당하는 정보가 없습니다");
        res.json(result);
    })
}
// 삭제 (/music/:id)
const remove = (req, res) => {
    const id = req.params.id;

    // 삭제처리 (findByIdAndRemove)
    MovieModel.findByIdAndRemove(id, (err, result) => {
        if (err) return res.status(500).send("삭제 중 오류가 발생했습니다");
        if (!result) return res.status(404).send("값을 찾을 수 없습니다");
        res.json(result);    
    });
}

const showCreatePage = (req, res) => {
    res.render("movie/create");
}

const showUpdatePage = (req, res) => {
    const id = req.params.id;
    MovieModel.findById(id, (err, result) => {
        if (err) return res.status(500).send("조회 오류");
        if (!result) return res.status(404).send("해당 정보가 없습니다");
        res.render("movie/update", { result });
    })
}

module.exports = { list, detail, create, update, remove, checkId, showCreatePage, showUpdatePage };