const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const Session = require("./services/sessionService");
const routes = require("./routes/index");

const PORT = process.env.PORT || 8000;
const IP = process.env.IP || "localhost";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(Session);

app.use("/", routes);

app.listen(PORT, IP, () => {
  console.log("server started on " + IP + ":" + PORT);
});
