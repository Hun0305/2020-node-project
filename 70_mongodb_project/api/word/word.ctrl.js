const WordModel = require("../../models/word");
const todayCtrl = require("../today/today.ctrl");

const showCreatePage = (req, res) => {
  res.render("word/create");
};

// 회원가입
// - 성공 : 201 응답(Created), 생성된 user 객체 반환
// - 실패 : 필수 입력값 누락 400 (Bad request)
//          email 중복 : 409 (Conflict)
const createWord = (req, res) => {
  const { name, category, meaning, example, ex_meaning, username } = req.body;
  if (!name || !category || !meaning || !username) {
    return res.status(400).send("필수값이 입력되지 않았습니다.");
  }

  WordModel.findOne({ name }, (err, result) => {
    if (err) return res.status(500).send("단어 등록에 오류가 발생했습니다.");
    if (result) {
      res.status(409).send("이미 있는 단어입니다"); // 여기서 갑자기 서버가 터짐.
    } else {
      const word = new WordModel({
        name,
        category,
        meaning,
        example,
        ex_meaning,
        username,
      });
      word.save((err, result) => {
        if (err)
          return res
            .status(500)
            .send("DB에 단어를 저장하는 중 오류가 발생했습니다");
        res.status(201).json(result);
        todayCtrl.updateMaxNum(word._id);
      });
    }
  });
};

const list = (req, res) => {
  WordModel.find((err, result) => {
    if (err) return res.status(500).end();
    res.render("word/list", { result });
  }).sort({ _id: 1 }); // -1 : 내림차순, 1 : 오름차순
};

const justSearchWord = (req, res) => {
  const query = req.params.query;
  WordModel.find({ name: query }, (err, result) => {
      //console.log(result);
    res.send(result);
  })
    .sort({ _id: 1 })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
};

const searchWord = (req, res) => {
  var query = req.params.query;
  /*
    console.log(query);
    res.send(query);
    */
  WordModel.find({ name: query }, (err, result) => {
    res.render("word/list", { result });
  }).sort({ _id: 1 });
};

module.exports = {
  showCreatePage,
  createWord,
  list,
  searchWord,
  justSearchWord,
};
