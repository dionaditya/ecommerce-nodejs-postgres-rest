const slonik = require("slonik");
const pool = require("../model/connection");

const { sql } = slonik;

const Table = "userAccount"


const migrateTableDatabase = async () => {
  if(process.argv[2] === 'up')  {
    let migrate = sql`
    CREATE TABLE ${sql.identifier([Table])} (
      user_id uuid NOT NULL,
      username VARCHAR(255),
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      PRIMARY KEY (user_id)
    )
  `;
    let dropTable = sql`
      DROP TABLE ${sql.identifier([Table])}
  `;
    try {
      let res = await pool.query(migrate);
      if (res.command === "CREATE") {
        return console.log("SUCCESS CREATE TABLE");
      }
    } catch (err) {
      if (err) {
        let res = await pool.query(dropTable);
        if(res.command) {
          console.log('success drop table')
          let res = await pool.query(migrate)
          if(res.command) {
            return console.log('success create table')
          }
        }
      } 
    }
  } else if(process.argv[2]) {

  }

};

migrateTableDatabase();
