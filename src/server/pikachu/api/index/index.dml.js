import connection from '../../../database/connection';
import query from './index.query';

const selectUser = async (data) => {
  const result = await connection.query(query.localLogin, data.cond.email);
  return result;
};

const insertUser = async (data) => {
  const result = await connection.query(query.signUp, [data.email, data.name, data.password]);
  return result;
};

export default {
  selectUser,
  insertUser,
};
