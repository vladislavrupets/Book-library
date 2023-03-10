const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const Session = require("./services/sessionService");

const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || 8000;
const IP = process.env.IP || "localhost";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(Session);

app.use("/user", authRoutes);

app.listen(PORT, IP, () => {
  console.log("server started on " + IP + ":" + PORT);
});
