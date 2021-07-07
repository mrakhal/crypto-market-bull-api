const express = require("express");
const PORT = process.env.PORT || 2000;
const app = express();
const cors = require("cors");
const bearerToken = require("express-bearer-token");
const { db } = require("./config/database");

app.use(cors());
app.use(express.json());
app.use(bearerToken());

app.get("/", (req, res, next) => {
  res.status(200).send("Purwa Express API");
});

db.getConnection((err, connection) => {
  if (err) {
    return console.error("Error MySQL", err.message);
  }
  console.log(`Connected to MySQL Server: ${connection.threadId}`);
});

const { cryptoRouter } = require("./router");
app.use("/crypto", cryptoRouter);

// ERROR HANDLING
app.use((error, req, res, next) => {
  console.log("Handling Error", error);
  res.status(500).send({ status: "Error Mysql", message: error });
});

app.listen(PORT, () =>
  console.log("Crypto Market Bull API is Running :", PORT)
);
