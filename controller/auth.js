const express = require("express");
const router = express.Router();
const { getQueryAllFromDatabase, postQueryToDatabase, deleteQueryToDatabase, updateQueryToDatabase } = require("../model/query");
const { sql } = require("slonik");
const v5 = require('uuid')
// Home page route.
router.post("/signup", async function(req, res) {
  const {username, email, password} = req.body
  const user_id = v5(username, v5.DNS)
  const data = await getQueryAllFromDatabase(
    sql`INSERT INTO "userAccount"(user_id, username, email, password)
        VALUES(${user_id}, ${username}, ${email}, ${password}) 
        RETURNING *`
  );
  res.json(data);
});

router.post("/login", async function(req, res) {
  const {email, password} = req.body
  const data = await getQueryAllFromDatabase(
    sql`SELECT user_id FROM "userAccount" 
        WHERE email = ${email}, password = ${password} RETURNING *`);
    res.json(data);
});





module.exports = router;
