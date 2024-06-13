import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import multer from "multer";
import session from "express-session";
import path from "path";
import url from "url";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();
const port = 5011;
const upload = multer();
// const __dirname = path.dirname(url.fileURLToPatch(import.meta.url));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(routes);

// Allow requests from all domains and localhost
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
  next();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
