const slonik = require("slonik");
const pool = require("../model/connection");

const { sql } = slonik;

const Table = "userData"


const migrateTableDatabase = async () => {
  if(process.argv[2] === 'up')  {
    let migrate = sql`
    CREATE TABLE ${sql.identifier([Table])} (
      user_id uuid NOT NULL,
      age int NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      address text NOT NULL,
      phone VARCHAR(255) NOT NULL,
      zipcode VARCHAR(20) NOT NULL,
      PRIMARY KEY (user_id),
      CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES "userAccount" (user_id)
    )
  `;
    let dropTable = sql`
      DROP TABLE ${sql.identifier([Table])}
  `;
    try {
      console.log('hai')
      let res = await pool.query(migrate);
      if (res.command === "CREATE") {
        return console.log("SUCCESS CREATE TABLE");
      }
    } catch (err) {
      console.log('yo')
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
