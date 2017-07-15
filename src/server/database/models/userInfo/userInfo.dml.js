/* eslint-disable indent */
import query from './userInfo.query';
import queryExcute from '../../queryExcute';

const selectUserByNo = async (data) => {
  const result = await queryExcute.selectOne(query.select.selectUserByNo, data.cond.userNo);
  return result;
};

const insertUser = async (data) => {
  const result = await queryExcute.insert(
    query.insert.signUp,
    [data.email, data.name, data.password],
  );

  return result;
};

const selectUserByEmail = async (cond) => {
  const result = await queryExcute.selectOne(query.select.selectUserByEmail, cond.userEmail);
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
  const result = await queryExcute.insert(executeQuery, param);
  return result;
};

const upsertSocialUser = async (data) => {
  let executeQuery = '';
  let param = '';

  if (Object.keys(data).length === 5) {
    executeQuery = query.insert.upsertSocialUser(data.socialName);
    param = [data.email, data.name, data.picture, data.socialId, data.token];
  } else {
    executeQuery = query.insert.upsertSocialUser(data.socialName);
    param = [
              data.no, data.email, data.name, data.picture, data[data.socialName.toLowerCase()], data.token, // eslint-disable-line max-len
              data.email, data.name, data.picture, data.socialId, data.token,
            ];
  }
  const result = await queryExcute.insert(executeQuery, param);
  return result;
};

const selectFacebookLoginUser = async (data) => {
  const result = await queryExcute.selectOne(query.select.selectUserByFacebook, data.cond.id);
  return result;
};

const selectBySocialLoginUser = async (data) => {
  const result = await queryExcute.selectOne(
      query.select.selectUserBySocial,
      [data.cond.socialName, data.cond.id],
  );

  return result;
};

export default {
  selectUserByNo,
  insertUser,
  selectUserByEmail,
  upsertFacebookUser,
  upsertSocialUser,
  selectFacebookLoginUser,
  selectBySocialLoginUser,
};
