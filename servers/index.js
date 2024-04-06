import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import db from "./src/configs/dbConfig.js";
import candidataRoute from "./src/routers/CandidateRoute.js";
import educationRoute from "./src/routers/EducationRoute.js";
import tranningRoute from "./src/routers/TranningRoute.js";
import experianceRoute from "./src/routers/ExperianceRoute.js";
import authRouter from "./src/routers/AuthRouter.js";
import adminRouter from "./src/routers/AdminRouter.js";
dotenv.config();
const { APP_PORT } = process.env;
// (async () => {
//   await db.sync({ force: true });
// })();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(candidataRoute);
app.use(educationRoute);
app.use(tranningRoute);
app.use(experianceRoute);
app.use(authRouter);
app.use(adminRouter);

app.listen(APP_PORT, async () => {
  try {
    console.log("server jalan");
    await db.authenticate();
    console.log("database terkoneksi");
  } catch (error) {
    console.log({ msg: error });
  }
});
