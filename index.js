import Express from "express";
import EJS from "ejs";
import cors from "cors";
import db from "./db";
import bodyparser from "body-parser";
import {
  Route
} from "./convertjs-master/src/router";

const Server = Express();

Server.use(bodyparser.json());
Server.use(bodyparser.urlencoded());

Server.use(cors());

Server.get("/", function (req, res) {
  res.send("Hello Akmal. What do you wanted to do today?").end();
});

Server.get("/data", (req, res) => {
  db.query("SELECT * FROM siswa", {
      type: db.QueryTypes.SELECT
    })
    .then(data => res.json(data))
    .catch(console.log);
});

Server.put("/data/:id", (req, res) => {
  let {
    nama,
    alamat,
    jk
  } = req.body;

  db.query(
      `update siswa set nama = '${nama}',
  alamat='${alamat}',
  jenis_kelamin= '${jk}' where id = ${req.params.id}`
    )
    .then(() => res.status(202).end())
    .catch(e => {
      console.log(e);
      res.status(500).end();
    });
});

Server.delete("/data/:id", (req, res) => {
  db.query(`DELETE FROM siswa where id = ${req.params.id}`)
    .then(() => {
      res.status(202).end();
    })
    .catch(e => {
      console.log(e);
      res.status(500).end();
    });
});

Server.post("/newdata", (req, res) => {
  db.query(
      `INSERT INTO siswa (nama,alamat,jenis_kelamin)
  VALUES
  ('${req.body.nama}','${req.body.alamat}','${req.body.jk}')`
    )
    .then(i => {
      res.status(201).json([]);
    })
    .then(e => {
      res.status(500).json(e);
    });
});

Server.post("/login", (req, res) => {
  const {
    username,
    password
  } = req.body;

  db.query(`
  SELECT * FROM tb_user WHERE username = '${username}' AND password = '${password}'
  `, {
      type: db.QueryTypes.SELECT
    })
    .then(data => {
      if (data.length == 1) {
        res.json(data[0])
      } else {
        res.status(503).end()
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
});


Server.use("/foto/:img", (req, res) => {
  const {
    img
  } = req.params
  const path = require('path')
  const filepath = path.resolve(__dirname + '/../express-backend-for-react-master/convertjs-master/foto/' + img)
  res.sendFile(filepath)
});

Server.listen(5700, () => console.log("Server Dimulai"));