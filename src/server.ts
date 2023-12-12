import express, { Request, Response, urlencoded } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
//routes
import authRoute from "./routes/auth";
const app = express();
require("dotenv").config();
const PORT = 3000;
const path = require("path");

app.get("/health", (req: Request, res: Response) => {
  res.send("Up and Running");
});

app.use(bodyParser.json());
app.use(cookieParser);
app.use("/api/v1", authRoute);

mongoose
  .connect(
    "mongodb+srv://HazratAli:HazratAli@atlascluster.wenyq4j.mongodb.net/?retryWrites=true&w=majority/Skype",
    {
      writeConcern: { w: "majority" },
    }
  )
  .then(() => {
    app.listen(3000, () => {
      console.log(`Running on port 3000`);
    });
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = app;
