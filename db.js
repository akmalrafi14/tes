import Sequalize, { Sequelize, DatabaseError } from "sequelize";

const db = new Sequelize("pwpbrpl2", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

function auth() {
  db.authenticate()
    .then(() => {
      console.log("DB Connect");
    })
    .catch(e => {
      console.log(e);
      setTimeout(() => {
        auth();
      }, 2000);
    });
}

auth();
export default db;
