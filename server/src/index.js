import "dotenv/config";
import "./db";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./routers/userRouter";
import tweetRouter from "./routers/tweetRouter";
import multer from "multer";
import cookieParser from "cookie-parser";
import path from "path";

// const upload = multer({ dest: "uploads/" });
// console.log(process.env.NODE_ENV === "production");
const upload = multer({ storage: multer.memoryStorage() });
const PORT = process.env.PORT;
const corsOptions = {
  origin: ["http://localhost:3000", "https://yj4-tweet.netlify.app"],
  methods: ["GET", "POST"],
  credentials: true, // cookie 정보를 사용하기 위해서 클라이언트와서버 통신
};
const app = express();
console.log(process.env.NODE_ENV === "production");

// 미들웨어
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false, // 세션이 변경되지 않아도 항상 저장되도록 설정합니다
    saveUninitialized: true, // 초기화되지 않은 세션을 저장소에 저장하지 않도록 설정합니다.
    cookie: {
      secure: process.env.NODE_ENV === "production", // HTTPS를 통해서만 세션 쿠키를 전송하도록 설정합니다.
      httpOnly: true, // javascript에서 사용이 안되게 하는 옵션

      path: "/",
      domain: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,

      // sameSite: "None",
    },
    store: new MongoStore({ mongoUrl: process.env.DB_URL + "/yj4-twitter" }),
  })
);

app.use(express.static("build"));

// 서브라우팅
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/index.html")));
app.use("/users", userRouter); // 회원가입, 로그인, 카카오로그인
app.use("/tweets", upload.single("file"), tweetRouter); // 글쓰기, 수정, 삭제, 읽기, 댓글

app.listen(PORT, () =>
  console.log(`Server is Listening on http://localhost:${PORT}`)
);
