import query from './auth.query';
import queryUtil from '../utils/queryUtil';

const deserializeUser = async (cond) => {
  const result = await queryUtil.selectOne(query.select.deserializeUser, cond.mbrNb);
  return result;
};

const insertUser = async (data) => {
  const result = await queryUtil.insert(
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
  const result = await queryUtil.insert(
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
