const slonik = require("slonik");
const pool = require("../model/connection");

const { sql } = slonik;

const Table = "transaction"


const migrateTableDatabase = async () => {
  if(process.argv[2] === 'up')  {
    let migrate = sql`
    CREATE TABLE ${sql.identifier([Table])} (
      transaction_id uuid NOT NULL,
      amount int NOT NULL,
      type BOOLEAN NOT NULL,
      transaction_date TIMESTAMP,
      user_id uuid NOT NULL,
      bank_name int NOT NULL,
      PRIMARY KEY (transaction_id),
      CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES "userAccount" (user_id)
    )
  `;
    let dropTable = sql`
      DROP TABLE ${sql.identifier([Table])}
  `;
    try {
      console.log('hai')
      let res = await pool.query(migrate);
      console.log(res)
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
