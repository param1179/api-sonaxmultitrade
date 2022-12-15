import express, { NextFunction, Request, Response } from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import { routes } from "./routes";
import { connect } from "./database";
import { config } from "./config";
import path from "path";
import { ErrorHandler } from "./errors";
import fileUpload from "express-fileupload";

const app = express();
const { PORT } = config;

connect();

app.use(fileUpload());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routes);

app.use(ErrorHandler);

app.use(express.static(path.resolve(__dirname, "../../web-sonaxmultitrade/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../web-sonaxmultitrade/build", "index.html"));
});

app.listen(PORT, () => {
  console.info(`server is listening on port ${PORT}`);
});
