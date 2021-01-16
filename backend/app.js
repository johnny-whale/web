var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
var mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(
  "mongodb+srv://clients:clients@cluster0.w0e9n.mongodb.net/clients?retryWrites=true&w=majority"
);

app.use(logger("dev"));
app.use(cors({ exposedHeaders: ["Content-Range"] }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.set("Content-Range", 100);
  next();
});

const ClientSchema = mongoose.Schema({
  name: String,
  surname: String,
  patronymic: String,
  id: { type: Number, required: true, index: true, unique: true },
  birthDate: Date,
  balance: Number,
});

const Client = mongoose.model("clients", ClientSchema);

app.get("/clients", function (req, res, next) {
  Client.find()
    .then(function (data) {
      return res.send(data);
    })
    .catch(next);
});

app.get("/clients/:id", function (req, res, next) {
  const id = req.params.id;
  Client.findOne({ id })
    .then(function (data) {
      return res.send(data);
    })
    .catch(next);
});

app.delete("/clients/:id", function (req, res, next) {
  Client.deleteOne({ id: req.params.id })
    .then(function (data) {
      console.log(data);
      return res.send({ id: req.params.id });
    })
    .catch(next);
});

app.put("/clients/:id", function (req, res, next) {
  Client.updateOne({ id: req.params.id }, req.body)
    .then(function (data) {
      return res.send(req.body);
    })
    .catch(next);
});

app.post("/clients", function (req, res) {
  client = new Client(req.body);
  client.save(function (err) {
    if (err) return res.send(err);
    return res.send(req.body);
  });
});

app.use(function (next) {
  next(createError(404));
});

app.use(function (err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.sendStatus(err.status || 500);
});

module.exports = app;
