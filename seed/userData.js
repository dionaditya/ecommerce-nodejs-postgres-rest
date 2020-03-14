const slonik = require("slonik");
const pool = require("../model/connection");
const faker = require('faker')

const { sql } = slonik;

const Table = "userData"

let fakeData = {
    uuid: 'b0949b36-6538-11ea-bc55-0242ac130003',
    age: faker.random.number(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    address: faker.address.streetAddress(),
    phone: faker.phone.phoneNumber(),
    zipCode: faker.address.zipCode(),

}
const seedTableUserData = async () => {
    let migrate = sql`
    INSERT INTO ${sql.identifier([Table])}(user_id, age, first_name, last_name, address, phone, zipcode)
    VALUES (${fakeData.uuid}, 
            ${fakeData.age}, 
            ${fakeData.first_name}, 
            ${fakeData.last_name},
            ${fakeData.address},
            ${fakeData.phone},
            ${fakeData.zipCode}) 
    RETURNING *
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



seedTableUserData()