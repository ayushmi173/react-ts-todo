import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { TodoRouter } from "../routes/todo";

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// THIS STRING IS THE LINK TO OUR MONGODB
const url = "mongodb://localhost/ts-react-todo";

// mongodb connection
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) =>
    app.listen(PORT, () => {
      console.log(
        mongoose.connection.readyState === 1 ? "Connected" : "Not Connected"
      );
      console.log(`app running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err));

app.use(TodoRouter);

app.get("/health", (req, res) => {
  res.send("Health is great!");
});
