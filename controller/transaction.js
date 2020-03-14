const express = require("express");
const router = express.Router();
const { getQueryAllFromDatabase, postQueryToDatabase, deleteQueryToDatabase, updateQueryToDatabase } = require("../model/query");
const { sql } = require("slonik");
const v5 = require('uuid')
// Home page route.

router.get("/:id/account/transaction", async function(req, res) {
  const {id} = req.params
  const data = await getQueryAllFromDatabase(
    sql`SELECT * FROM transaction 
        WHERE user_id = ${id} `);
  res.json(data);
});

router.get("/:id/account/transaction/:transactionId", async function(req, res) {
  const {transactionId} = req.params
  const {id} = req.params
  const data = await getQueryAllFromDatabase(
    sql`SELECT * FROM transaction
        WHERE transaction_id = ${transactionId}`
  );
  res.json(data);
});

router.post('/:id/account/transaction', async function(req, res) {
  const {id} = req.params
  const {amount, type, transaction_date, bank_name} = req.body
  const transaction_id = v5()
  const result = await postQueryToDatabase(
    sql`INSERT INTO transaction(
           transaction_id, 
           amount, 
           type,
           transaction_data,
           user_id,
           bank_name
           ) 
        VALUES(
            ${transaction_id}, 
            ${amount}, 
            ${type}, 
            ${transaction_date}, 
            ${id},
            ${bank_name}) RETURNING *`
    )

    if(!result.error) {
        const currentAmount = await getQueryAllFromDatabase(sql`
        SELECT amount FROM accountbank WHERE user_id = ${id}
    `)
        const updatedAmount = currentAmount + amount
        return res.json(await updateQueryToDatabase(sql`
        UPDATE accountbank
            SET amount = ${updatedAmount}
        WHERE user_id = ${id} RETURNING *
      `)) 
    
    } else {
        res.json(result)
    }
})


router.delete('/:id/account/transaction/:transactionId', async function(req, res) {
  const {transactionId} = req.params
  return res.json(await deleteQueryToDatabase(
    sql`DELETE FROM transaction 
          WHERE transaction_id = ${transactionId} RETURNING *`
    )) 
})



module.exports = router;
