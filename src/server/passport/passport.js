import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import connection from '../database/connection';

passport.serializeUser((user, done) => {
  done(null, user.mbrNb);
});

passport.deserializeUser(async (id, done) => {
  // findBy User
  try {
    const user = connection.query('SELECT * FROM TB_MEMBER WHERE MBR_NB=?', [id]);
    done(null, user);
  } catch (e) {
    done(e, null);
  }
});

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await connection.query('SELECT * FROM TB_MEMBER WHERE MBR_EAMIL=?', [email]);
    //
    if (!user) {
      return done(null, false, { msg: '가입된 회원이 아닙니다. 다시시도해주세요' });
    }

    let result = null;
    if (user.password === password) {
      result = done(null, user);
    } else {
      result = done(null, false, { msg: '이메일이나 패스워드가 잘못되었습니다.' });
    }

    return result;
  } catch (e) {
    return done(e);
  }
}));
