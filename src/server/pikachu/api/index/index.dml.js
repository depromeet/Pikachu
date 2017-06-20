import connection from '../../../database/connection';

const selectUser = async (data) => {
  const result = await connection.query('SELECT * FROM TB_MEMBER WHERE MBR_EMAIL = ?', data.cond.email);
  return result;
};

const insertUser = async (data) => {
  const result = await connection.query('INSERT INTO TB_MEMBER (MBR_EMAIL, MBR_NAME, PASSWORD) VALUES (?, ?, ?)', [data.email, data.name, data.password]);
  return result;
};

export default {
  selectUser,
  insertUser,
};
