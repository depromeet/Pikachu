import { Strategy as LocalStrategy } from 'passport-local';
import userDml from '../../database/models/userInfo/userInfo.dml';

export default new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = userDml.selectUserByEmail({
      userEmail: email,
    });
    //
    if (!user) {
      return done(new Error('이메일이나 패스워드가 잘못되었습니다.'), null);
    }

    let result = null;
    if (user.password === password) {
      result = done(null, user);
    } else {
      result = done(new Error('이메일이나 패스워드가 잘못되었습니다.'), null);
    }

    return result;
  } catch (e) {
    return done(e);
  }
});
