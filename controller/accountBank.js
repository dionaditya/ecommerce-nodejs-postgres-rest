const express = require("express");
const router = express.Router();
const { getQueryAllFromDatabase, postQueryToDatabase, deleteQueryToDatabase, updateQueryToDatabase } = require("../model/query");
const { sql } = require("slonik");
// Home page route.
router.get("/:id/account", async function(req, res) {
  const {id} = req.params
  const data = await getQueryAllFromDatabase(
    sql`SELECT * FROM "accountbank"
        WHERE user_id = ${id}`
  );
  res.json(data);
});

router.post('/:id/account', async function(req, res) {
  const {id} = req.params
  const {bank_name, amount} = req.body
  return res.json(await postQueryToDatabase(
    sql`INSERT INTO accountbank(
           bank_name, 
           amount, 
           user_id) 
        VALUES(${bank_name}, ${amount}, ${id}) RETURNING *`
    )) 
})


router.delete('/:id/account', async function(req, res) {
  const {id} = req.params
  return res.json(await deleteQueryToDatabase(
    sql`DELETE FROM accountbank 
          WHERE user_id = ${id} RETURNING *`
    )) 
})



module.exports = router;
