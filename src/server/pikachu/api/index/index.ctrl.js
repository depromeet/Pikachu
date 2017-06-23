import passport from 'passport';
import _ from 'partial-js';
import userDML from './index.dml';

const postLogin = (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    return res.send({
      code: 0,
      success: false,
      msg: 'validation Error',
      data: {},
    });
  }

  return passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.send({
        code: 0,
        success: false,
        msg: err.message,
        data: info,
      });
    }

    if (!user) {
      return res.send({
        code: 0,
        success: false,
        msg: 'validation Error',
        data: info,
      });
    }

    return req.logIn(user, (e) => {
      if (e) { return res.send(e); }

      req.result = {
        code: 200,
        success: true,
        msg: '',
        user: _.pick(user, 'mbrNb'),
      };

      return next();
    });
  })(req, res, next);
};

const postSignUp = async (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    return res.send({
      code: 0,
      success: false,
      msg: '파라미터 제대로 전달안댐',
      data: errors,
    });
  }

  try {
    const findUser = await userDML.selectUser({
      cond: {
        email: req.body.email,
      },
    });

    if (findUser[0]) { // 이미 기존에 가입된 회원이 존재하는 경우
      // req.flash('errors', { msg: 'Account with that email address already exists.' });
      return res.send({
        code: 0,
        success: false,
        msg: 'Account with that email address already exists.',
        data: {},
      });
    }

    const result = await userDML.insertUser({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    });

    return res.send({
      code: 200,
      success: true,
      msg: 'insert',
      data: result.insertId,
    });
  } catch (err) {
    return next(err);
  }
};

export default {
  postLogin,
  postSignUp,
};
