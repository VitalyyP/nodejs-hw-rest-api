import express from "express";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./routes/api/auth";
import contactsRouter from "./routes/api/contacts";
import usersRouter from "./routes/api/users";
import { HttpCode, LIMIT_JSON } from "./lib/constants";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));
app.use(express.static(process.env.PUBLIC_FOLDER));
app.use(cors());
app.use(express.json({ limit: LIMIT_JSON }));
app.use((req, res, next) => {
  app.set("lang", req.acceptsLanguages(["en", "ru"]));
  next();
});

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    status: "fail",
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: err.message,
  });
});

export default app;
