const slonik = require("slonik");
const pool = require("./connection");

const { sql } = slonik;

const getQueryAllFromDatabase = async query => {
  try {
    const res = await pool.query(query);
    const data = {
      message: "query success from database",
      data: [res.rows, res.rowCount],
      erro: false
    };
    return data;
  } catch (err) {
    return {
      message: "query failed",
      data: null,
      error: true
    };
  }
};

const getQueryFromDatabase = async query => {
  try {
    const res = await pool.query(sql`
        ${query}
    `);
    const data = {
      message: "query success from database",
      data: [res.rows[0], res.rowCount],
      error: false
    };
    return data;
  } catch (err) {
    return {
      message: "query failed",
      data: null,
      errro: true
    };
  }
};

const postQueryToDatabase = async query => {
  try {
    const res = await pool.query(sql`
        ${query}
    `);
    if (res.rowCount > 0) {
      const data = {
        message: "insert success to database",
        data: [res.rows[0], res.rowCount],
        error: false
      };
      return data;
    } else {
      return {
        message: "insert failed to database",
        data: null,
        error: true
      };
    }
  } catch (err) {
    return {
      message: "insert failed to database",
      data: null,
      error: true
    };
  }
};

const updateQueryToDatabase = async query => {
  try {
    const res = await pool.query(sql`
        ${query}
    `);
    if (res.rowCount > 0) {
      const data = {
        message: "update success to database ",
        data: [res.rows[0], res.rowCount],
        error: false
      };
      return data;
    } else {
      return {
        message: "update failed to database",
        data: null,
        error: true
      };
    }
  } catch (err) {
    return {
      message: "update failed to database",
      data: null,
      error: true
    };
  }
};

const deleteQueryToDatabase = async query => {
  try {
    const res = await pool.query(sql`
        ${query}
    `);
    console.log(res);
    if (res.rowCount === 0) {
      const data = {
        message: "delete success to database",
        data: [res.rows[0], res.rowCount],
        error: false
      };
      return data;
    } else {
      return {
        message: "delete failed to database",
        data: null,
        error: true
      };
    }
  } catch (err) {
    return {
      message: "delete failed to database",
      data: null,
      error: true
    };
  }
};

module.exports.getQueryAllFromDatabase = getQueryAllFromDatabase;
module.exports.getQueryFromDatabase = getQueryFromDatabase;
module.exports.postQueryToDatabase = postQueryToDatabase;
module.exports.updateQueryToDatabase = updateQueryToDatabase;
module.exports.deleteQueryToDatabase = deleteQueryToDatabase;
