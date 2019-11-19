import Express from "express";
import Cors from "cors";
import BodyParser from "body-parser";
import { Route } from "./router";
import { Server } from "http";
import db from "../db/db";
import EJS from "ejs";

const server = Express();
server.use(Cors());
server.use(BodyParser.json());

Route(server);

server.listen(7100, () => {
  console.log("Server start");
});

//Select Data from DB
  // server.get("/data", (req, res) => {
  //   db.query("SELECT * FROM siswa" , {type: db.QueryTypes.SELECT})
  //   .then(data => res.json(data))
  //   .catch(console.log);
  // });

  // server.post("/simpan", (req, res) => {
  //   let{
  //     nama,
  //     kelas,
  //     alamat
  //   } = req.body;
  //   db.query(`INSERT INTO siswa (nama, kelas, alamat) VALUES ('${nama, kelas, alamat}')`)
  //   .then(i => {
  //     res.status(201).json([]);
  //   })
  //   .then(e => {
  //     res.status(500).json(e);
  //   });
  // });