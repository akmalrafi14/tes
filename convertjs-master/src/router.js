import {
  ambilDataSiswa,
  cariDataSiswa,
  simpanDataSiswa,
  deleteDataSiswa,
  simpanEditDataSiswa,
  login
} from "./routersiswa";

import db from "../db/db";


export function Route(server) {
  server.get("/data", ambilDataSiswa);
  server.get("/cari", cariDataSiswa);
  server.post("/simpan", simpanDataSiswa);
  server.delete("/data", deleteDataSiswa);
  server.put("/simpandata", simpanEditDataSiswa);
  server.post("/login", login);

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
}