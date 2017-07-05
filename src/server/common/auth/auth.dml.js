/* eslint-disable indent */
import query from './auth.query';
import queryUtil from '../utils/queryUtil';

const selectUserByNo = async (cond) => {
  const result = await queryUtil.selectOne(query.select.selectUserByNo, cond.userNo);
  return result;
};

const insertUser = async (data) => {
  const result = await queryUtil.insert(
    query.insert.signUp,
    [data.email, data.name, data.password],
  );

  return result;
};

const selectUserByEmail = async (cond) => {
  const result = await queryUtil.selectOne(query.select.selectUserByEmail, cond.userEmail);
  return result;
};

const upsertFacebookUser = async (data) => {
  let executeQuery = '';
  let param = '';

  if (Object.keys(data).length === 5) {
    executeQuery = query.insert.insertFacebookUser;
    param = [data.email, data.name, data.picture, data.facebook, data.token];
  } else {
    executeQuery = query.insert.upsertFacebookUser;
    param = [
              data.no, data.email, data.name, data.picture, data.facebook, data.token,
              data.email, data.name, data.picture, data.facebook, data.token,
            ];
  }
  const result = await queryUtil.insert(executeQuery, param);
  return result;
};

const selectFacebookLoginUser = async (data) => {
  const result = await queryUtil.selectOne(query.select.selectUserByFacebook, data.cond.id);
  return result;
};

export default {
  selectUserByNo,
  insertUser,
  selectUserByEmail,
  upsertFacebookUser,
  selectFacebookLoginUser,
};
