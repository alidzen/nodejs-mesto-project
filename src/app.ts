import path from "path";
import express, { NextFunction, Response, Request } from "express";
import { errors } from "celebrate";
import mongoose from "mongoose";
import cookerParser from "cookie-parser";
import filmsRouter from "./routes/films";
import directorsRouter from "./routes/directors";
import { requestLogger, errorLogger } from "middlewares/logger";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookerParser());
app.use(helmet());

mongoose.connect("mongodb://localhost:27017/mynewdb");

app.use(requestLogger);

app.use("/films", filmsRouter);
app.use("/directors", directorsRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use(errorLogger);
app.use(errors());

app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
});
app.listen(PORT, () => {
  console.log("Ссылка на сервер");
  console.log(BASE_PATH);
});
