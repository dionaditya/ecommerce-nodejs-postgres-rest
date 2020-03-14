const slonik = require("slonik");
const pool = require("../model/connection");
const faker = require('faker')

const { sql } = slonik;

const Table = "userAccount"

let fakeData = {
    uuid: faker.random.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
}
const seedTableUserAccount = async () => {
    let migrate = sql`
    INSERT INTO ${sql.identifier([Table])}(user_id, username, email, password)
    VALUES (${fakeData.uuid}, ${fakeData.username}, ${fakeData.email}, ${fakeData.password}) RETURNING *
 `;

   try {
     let res = await pool.query(migrate);
     console.log(res)
     if (res.command === "CREATE") {
       return console.log("SUCCESS CREATE TABLE");
     }
   } catch (err) {
     if (err) {
       console.log(err)
     } 
   }
};



for(let i = 0; i < 20; i++) {
    seedTableUserAccount()
}
