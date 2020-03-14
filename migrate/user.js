const slonik = require("slonik");
const pool = require("../model/connection");

const { sql } = slonik;

const Table = "user_account"



const migrateTableDatabase = async () => {
  console.log(process.argv[2])
  if(process.argv[2] === 'up')  {
    let migrate = sql`
    CREATE TABLE ${sql.identifier([Table])} (
      user_id serial NOT NULL,
    )
  `;
    let dropTable = sql`
      DROP TABLE ${sql.identifier([Table])}
  `;
    try {
      const res = await pool.query(migrate);
      if (res.command === "CREATE") {
        return console.log("SUCCESS CREATE TABLE");
      }
    } catch (err) {
      if (err) {
        const res = await pool.query(dropTable);
        if (res.command === "DROP") {
          const createTable = await pool.query(migrate);
          if (createTable.command === "CREATE") {
            return console.log("SUCCESS DROP TABLE AND CREATE ONE");
          }
        } else {
          return console.log("NOT SUCCESS");
        }
      }
    }
  } else if(process.argv[2]) {

  }

};

migrateTableDatabase();
