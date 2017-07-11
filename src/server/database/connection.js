import mysql from 'mysql';
import winstron from 'winston';

import u from '../utils/util';

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});


pool.getConnection((err, conn) => { // 로딩되면 어떤 데이터 베이스를 사용할지 결정한다.
  conn.query(`USE ${process.env.DATABASE_NAME}`, () => {
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
// 디버깅 모드일 때 queryString을 출력해 줄 수 있게 해줄 것..
const query = (queryString, params) => new Promise((res, rej) => {
  getConnection((err, conn) => {
    if (err) {
      rej(err);
    }
    const sql = conn.query(queryString, params, (e, rows) => {
      if (e) {
        return rej(e);
      }

      return res(u.convertToCamel(rows));
    });

    winstron.log(`info ${sql}`);
  });
});

export default { query };
