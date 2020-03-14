const express = require("express");
const router = express.Router();
const { getQueryAllFromDatabase, postQueryToDatabase, deleteQueryToDatabase, updateQueryToDatabase } = require("../model/query");
const { sql } = require("slonik");
// Home page route.
router.get("/", async function(req, res) {
  const data = await getQueryAllFromDatabase(
    sql`SELECT * FROM products`);
  res.json(data.rows);
});

router.get("/:id/data", async function(req, res) {
  const {id} = req.params
  const data = await getQueryAllFromDatabase(
    sql`SELECT * FROM "userData"
        WHERE user_id = ${id}`
  );
  res.json(data);
});

router.post('/:id/data', async function(req, res) {
  const {id} = req.params
  const {
    age, 
    first_name,
    last_name,
    address,
    phone,
    zipcode} = req.body
  return res.json(await postQueryToDatabase(
    sql`INSERT INTO accountbank(
           user_id, 
           age, 
           first_name,
           last_name,
           address,
           phone,
           zipcode
           ) 
        VALUES(${id}, 
               ${age}, 
               ${first_name}, 
               ${last_name}, 
               ${address}, 
               ${phone}, 
               ${zipcode}) RETURNING *`
    )) 
})

router.put('/:id/data', async function(req, res) {
  const {id} = req.params
  const {
    age, 
    first_name,
    last_name,
    address,
    phone,
    zipcode} = req.body
  return res.json(await postQueryToDatabase(
    sql`UPDATE accountbank 
        SET user_id = ${id}, 
             age = ${age}, 
             first_name = ${first_name},
             last_name = ${last_name},
             address = ${address},
             phone = ${phone},
             zipcode = ${zipcode}
        WHERE user_id = ${user_id} RETURNING *`
    )) 
})


module.exports = router;
