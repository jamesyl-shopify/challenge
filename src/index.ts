import express from "express";
import cors from "cors";
import getRouter from "./controller/route";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
const app = express();
app.use(cors());
app.use(getRouter());
const port = process.env.PORT || 8000;

if (process.env.NODE_ENV !== "testing") {
  let databaseType = "main";
  if (process.env.NODE_ENV === "development") databaseType = "dev";
  else {
    console.log(path.join(__dirname, "..", "build", "index.html"));

    app.use(express.static("build"));
    app.get("*", function (_, res) {
      res.sendFile(path.join(__dirname, "..", "build", "index.html"));
    });
  }
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.zcpwo.mongodb.net/${databaseType}?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("Successfully connected to MongoDB");
      app.listen(port, () => {
        console.log(`server running on port ${port}`);
      });
    })
    .catch((err) =>
      console.error("Failed to connect to MongoDB: " + err.message)
    );
}
export default app;
