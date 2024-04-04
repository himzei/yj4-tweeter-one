"use strict";

require("dotenv/config");
require("./db");
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _userRouter = _interopRequireDefault(require("./routers/userRouter"));
var _tweetRouter = _interopRequireDefault(require("./routers/tweetRouter"));
var _multer = _interopRequireDefault(require("multer"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// const upload = multer({ dest: "uploads/" });
// console.log(process.env.NODE_ENV === "production");
var upload = (0, _multer["default"])({
  storage: _multer["default"].memoryStorage()
});
var PORT = process.env.PORT;
var corsOptions = {
  origin: ["http://localhost:3000", "https://yj4-tweet.netlify.app"],
  methods: ["GET", "POST"],
  credentials: true // cookie 정보를 사용하기 위해서 클라이언트와서버 통신
};
var app = (0, _express["default"])();
console.log(process.env.NODE_ENV === "production");

// 미들웨어
app.use((0, _cookieParser["default"])());
app.use(_express["default"].json());
app.use((0, _morgan["default"])("dev"));
app.use((0, _cors["default"])(corsOptions));
app.use((0, _expressSession["default"])({
  secret: process.env.SECRET,
  resave: false,
  // 세션이 변경되지 않아도 항상 저장되도록 설정합니다
  saveUninitialized: true,
  // 초기화되지 않은 세션을 저장소에 저장하지 않도록 설정합니다.
  cookie: {
    secure: process.env.NODE_ENV === "production",
    // HTTPS를 통해서만 세션 쿠키를 전송하도록 설정합니다.
    httpOnly: true,
    // javascript에서 사용이 안되게 하는 옵션

    path: "/",
    domain: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24

    // sameSite: "None",
  },
  store: new _connectMongo["default"]({
    mongoUrl: process.env.DB_URL + "/yj4-twitter"
  })
}));
app.use(_express["default"]["static"]("build"));

// 서브라우팅
app.get("/", function (req, res) {
  return res.sendfile(__dirname + "/index.html");
});
app.use("/users", _userRouter["default"]); // 회원가입, 로그인, 카카오로그인
app.use("/tweets", upload.single("file"), _tweetRouter["default"]); // 글쓰기, 수정, 삭제, 읽기, 댓글

app.listen(PORT, function () {
  return console.log("Server is Listening on http://localhost:".concat(PORT));
});