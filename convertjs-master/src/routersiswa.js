import db from "../db/db";

export function ambilDataSiswa(request, response) {
  db.query("SELECT * FROM tb_user", {
      type: db.QueryTypes.SELECT
    })
    .then(data => response.json(data))
    .catch(console.log);
}
export function cariDataSiswa(request, response) {
  //Query
}
export function simpanDataSiswa(request, response) {
  let {
    nama,
    kelas,
    alamat
  } = req.body;
  db.query(`INSERT INTO siswa (nama, kelas, alamat) VALUES ('${nama, kelas, alamat}')`)
    .then(i => {
      res.status(201).json([]);
    })
    .then(e => {
      res.status(500).json(e);
    });
}
export function simpanEditDataSiswa(request, response) {
  //Query
}
export function deleteDataSiswa(request, response) {
  //Query
}

export function login(request, response) {
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
}