import connection from '../../database/connection'; // connection에 대한 정보가 변경이 되면 계속 이걸 모든 파일에서 바꿔줘야되는데.. 효율적인 방법을 찾아야 할듯..
import query from './auth.query';
import queryUtil from '../utils/queryUtil';

const deserializeUser = async (cond) => {
  const result = await queryUtil.selectOne(query.select.deserializeUser, cond.mbrNb);
  return result;
};

const insertUser = async (data) => {
  const result = await connection.query(
    query.insert.signUp,
    [data.email, data.name, data.password],
  );

  return result;
};

const selectUser = async (cond) => {
  const result = await queryUtil.selectOne(query.select.localLogin, cond.userEmail);
  return result;
};

const insertFacebookUser = async (data) => {
  const result = await connection.query(
                    query.insert.insertFacebookUser,
                    [data.email, data.name, data.picture, data.authStr, data.token],
                  );
  return result;
};

const selectFacebookLoginUser = async (cond) => {
  const result = await queryUtil.selectOne(query.select.facebookLoginCheck, [cond.vender, cond.id]);
  return result;
};

export default {
  deserializeUser,
  insertUser,
  selectUser,
  insertFacebookUser,
  selectFacebookLoginUser,
};
