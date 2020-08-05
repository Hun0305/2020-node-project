//데이터
let nextId = 4;
let movie = [
    { id : 1, title : "기생충", director : "봉준호", year : "2019"},
    { id : 2, title : "어벤져스 4 : 엔드게임", director : "루소 형제", year : "2019"},
    { id : 3, title : "숨바꼭질", director : "허정", year : "2013"},
]

// 목록 조회 (localhost:3000/movie?limit=3)
// - 성공 : limit 수만큼 movie 객체를 담은 객체를 리턴 (200 : OK)
// - 실패 : limit가 숫자형이 아닌경우 (400:Bad request)
const list = (req, res) => {
    console.log(typeof req.query.limit); // 3
    const limit = parseInt(req.query.limit || 10, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }   

    // limit 수만큼 movie 객체를 담은 배열 리턴
    res.json(movie.slice(0, limit));
}

// 상세 조회 (/movie/:id)
// - 성공 : id에 해당하는 movie 객체를 리턴 (200 : Ok)
// - 실패 : id가 숫자가 아니거나 (400 : Bad Request)
//          해당하는 id가 없는 경우 (404 : Not Found)

const detail =  (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = movie.find(m => m.id === id);
    if (!result) return res.status(404).end();

    res.json(result);
}

// 등록
// - 성공 : 201을 응답, 배열을 리턴, 201 : Created
// - 실패 : singer, title 값 누락시 400 반환 (400 : Bad Request)

const create = (req, res) => {
    const { title, director, year } = req.body;
    if (!title || !director || !year) return res.status(400).end();
    const m ={ id: nextId++, title, director, year };
    movie.push(m);
    res.status(201).json(m);
}

// 수정 (/movie/:id)
// - 성공 : id에 해당하는 movie 객체에 데이터를 입력데이터로 수정함
//          해당 객체 반환(200:OK)
// - 실패 : id가 숫자가 아닐경우 (400 : Bad Request)
//          해당하는 id가 없는 경우 (404 : Not Found)
const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = movie.find(m => m.id === id);
    if (!result) return res.status(404).end();

    const { title, director, year } = req.body;
    if (title) result.title = title;
    if (director) result.director = director;
    if (year) result.year = year;

    res.json(result);
}

// 삭제 (/movie/:id)
// - 성공 : id에 해당하는 객체를 삭제하고 삭제 후 결과 배열 리턴 (200 : OK)
// - 실패 : id가 숫자가 아닌경우 (400 : Bad Request)
//          해당하는 id가 없는경우(404 : Not Found)

const remove = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = movie.find(m => m.id === id);
    if (!result) return res.status(404).end();

    movie = movie.filter(m => m.id !== id);
    res.json(movie);
}

module.exports = { list, detail, create, update, remove };

/*
//목록조회
const list = (req, res) => {
    res.send("movie list");    
}

//상세조회
const detail = (req, res) => {
    res.send(`movie detail : ${req.params.id}`);
}
//등록
const create = (req, res) => {
    res.send("movie create");
}
//수정
const update = (req, res) => {
    res.send(`movie update : ${req.params.id}`);
}
//삭제
const remove = (req, res) => {
    res.send(`movie remove : ${req.params.id}`);
}

module.exports = {list, detail, create, update, remove };
*/