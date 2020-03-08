const express = require("express");
const router = express.Router();
const { getQueryAllFromDatabase, postQueryToDatabase, deleteQueryToDatabase, updateQueryToDatabase } = require("../model/query");
const { sql } = require("slonik");
const city = "yogyakarta";
// Home page route.
router.get("/", async function(req, res) {
  const data = await getQueryAllFromDatabase(
    sql`SELECT * FROM weather 
        WHERE city = ${city}`
  );
  res.json(data.rows);
});

router.get("/products", async function(req, res) {
  const data = await getQueryAllFromDatabase(
    sql`SELECT * FROM weather 
        WHERE city = ${city}`
  );
  res.json(data.rows);
});

router.post('/products', async function(req, res) {
  console.log(req.body)
  return res.json(await postQueryToDatabase(
    sql`INSERT INTO weather(city) VALUES(${req.body.city}) RETURNING *`
    )) 
})

router.delete('/products', async function(req, res) {
  console.log(req.body)
  return res.json(await postQueryToDatabase(
    sql`INSERT INTO weather(city) VALUES(${req.body.city}) RETURNING *`
    )) 
})



module.exports = router;
