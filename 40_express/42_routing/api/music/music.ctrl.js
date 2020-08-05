// 데이터
let nextId = 4;
let music = [
    {id: 1, singer: "아이유", title : "시간의 바깥"},
    {id: 2, singer: "잔나비", title : "꿈과 책과 힘과 벽"},
    {id: 3, singer: "임창정", title : "십삼월"}
];

// 목록 조회 (localhost:3000/music?limit=3)
// - 성공 : limit 수만큼 music 객체를 담은 객체를 리턴 (200 : OK)
// - 실패 : limit가 숫자형이 아닌경우 (400:Bad request)
const list = (req, res) => {
    console.log(typeof req.query.limit); // 3
    const limit = parseInt(req.query.limit || 10, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }   

    // limit 수만큼 music 객체를 담은 배열 리턴
    res.json(music.slice(0, limit));
}
// 상세 조회 (/music/:id)
// - 성공 : id에 해당하는 music 객체를 리턴 (200 : Ok)
// - 실패 : id가 숫자가 아니거나 (400 : Bad Request)
//          해당하는 id가 없는 경우 (404 : Not Found)

const detail =  (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = music.find(m => m.id === id);
    if (!result) return res.status(404).end();

    res.json(result);
    // res.send(`music detail : ${req.params.id}`);
}
// 등록
// - 성공 : 201을 응답, 배열을 리턴, 201 : Created
// - 실패 : singer, title 값 누락시 400 반환 (400 : Bad Request)

const create = (req, res) => {
    const { singer, title } = req.body;
    if (!singer || !title) return res.status(400).end();
    const m ={ id: nextId++, singer, title };
    music.push(m);
    res.status(201).json(m);
}

// 수정 (/music/:id)
// - 성공 : id에 해당하는 music 객체에 데이터를 입력데이터로 수정함
//          해당 객체 반환(200:OK)
// - 실패 : id가 숫자가 아닐경우 (400 : Bad Request)
//          해당하는 id가 없는 경우 (404 : Not Found)
const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = music.find(m => m.id === id);
    if (!result) return res.status(404).end();

    const { singer, title} = req.body;
    if (singer) result.singer = singer;
    if (title) result.title = title;
    
    res.json(result);
    // res.send(`music update : ${req.params.id}`);
}
// 삭제 (/music/:id)
// - 성공 : id에 해당하는 객체를 삭제하고 삭제 후 결과 배열 리턴 (200 : OK)
// - 실패 : id가 숫자가 아닌경우 (400 : Bad Request)
//          해당하는 id가 없는경우(404 : Not Found)
const remove = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = music.find(m => m.id === id);
    if (!result) return res.status(404).end();

    music = music.filter(m => m.id !== id);
    res.json(music);
    //res.send(`music remove : ${req.params.id}`);
}

module.exports = { list, detail, create, update, remove };