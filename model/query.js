const slonik = require("slonik");
const pool = require("./connection");

const { sql } = slonik;

const getQueryAllFromDatabase = async query => {
  try {
    const res = await pool.query(query);
    const data = {
      message: "success",
      rowCount: res.rowCount,
      rows: res.rows
    };
    return data;
  } catch (err) {
    console.log(err)
    return {
      message: "query failed"
    };
  }
};

const getQueryFromDatabase = async query => {
  try {
    const res = await pool.query(sql`
        ${query}
    `);
    const data = {
      message: "query success",
      rowCount: res.rowCount,
      rows: res.rows[0]
    };
    return data;
  } catch (err) {
    return {
      message: "query failed"
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
        message: "insert success",
        rowCount: res.rowCount,
        rows: res.rows[0]
      };
      return data;
    } else {
      return {
        message: "insert failed"
      };
    }
  } catch (err) {
    return {
      message: "insert failed"
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
        message: "update success",
        rowCount: res.rowCount,
        rows: res.rows[0]
      };
      return data;
    } else {
      return {
        message: "query failed"
      };
    }
  } catch (err) {
    return {
      message: "query failed"
    };
  }
};

const deleteQueryToDatabase = async query => {
  try {
    const res = await pool.query(sql`
        ${query}
    `);
    if (res.rowCount > 0) {
      const data = {
        message: "delete success",
        rowCount: res.rowCount,
        rows: res.rows[0]
      };
      return data;
    } else {
      return {
        message: "delete failed"
      };
    }
  } catch (err) {
    return {
      message: "delete failed"
    };
  }
};

module.exports.getQueryAllFromDatabase = getQueryAllFromDatabase;
module.exports.getQueryFromDatabase = getQueryFromDatabase;
module.exports.postQueryToDatabase = postQueryToDatabase;
module.exports.updateQueryToDatabase = updateQueryToDatabase;
module.exports.deleteQueryToDatabase = deleteQueryToDatabase;
