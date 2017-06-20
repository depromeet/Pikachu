import mysql from 'mysql';
import u from '../../utils/util';

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 10,
});


pool.getConnection((err, conn) => {
  conn.query('USE MYSQL', () => {
    conn.release();
  });
});

// Returns a connection to the db
const getConnection = (callback) => {
  pool.getConnection((err, conn) => {
    callback(err, conn);
  });
};

// Helper function for querying the db; releases the db connection
// callback(err, rows)
const query = (queryString, params) => new Promise((res, rej) => {
  getConnection((err, conn) => {
    let query = conn.query(queryString, params, (e, rows) => {
      conn.release();

      if (e) {
        return rej(e);
      }
      console.log(rows);
      console.log('bbbbbb');

      return res(u.convertToCamel(rows));
    });

    console.log(query);
  });
});

export default { query };
