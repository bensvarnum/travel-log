const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

require("dotenv").config();

const middlewares = require("./middlewares");
const logs = require("./api/logs");
const app = express();

app.enable("trust proxy"); // needed for rate limiting by Client IP

app.use(morgan("common"));
app.use(helmet());
// app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    msg: "Welcome to the Jungle!",
  });
});
app.use("/api/logs", cors(corsOptions), logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
