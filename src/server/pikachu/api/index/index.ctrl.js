import passport from 'passport';
import userDML from './index.dml';

const postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }

    if (!user) {
      req.flash('errors', info);
      return res.redirect('/login');
    }

    return req.logIn(user, (e) => {
      if (err) {
        return next(e);
      }

      req.flash('success', { msg: 'Success! You are logged in.' });
      return res.redirect(req.session.returnTo || '/');
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
        msg: 'Account with that email address already exists.',
        data: false,
      });
    }

    const insertResult = await userDML.insertUser({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    });

    return res.send({
      code: 200,
      msg: 'insert',
      data: insertResult,
    });
  } catch (err) {
    return next(err);
  }
};

export default {
  postLogin,
  postSignUp,
};
