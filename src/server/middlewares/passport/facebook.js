import { Strategy as FacebookStrategy } from 'passport-facebook';
import config from '../../config';
import userDml from '../../database/models/userInfo/userInfo.dml';

export default new FacebookStrategy({
  clientID: config.auth.facebook.id,
  clientSecret: config.auth.facebook.secret,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['displayName', 'name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  const fooBar = async () => {
    try {
      if (req.user) { // 요청 정보에 유저에 대한 데이터가 존재하는 경우
        const userLogin = await userDml.selectFacebookLoginUser({
          cond: {
            id: profile.id,
          },
        });

        if (userLogin) {
          done(null, {
            id: userLogin.userNo,
            email: userLogin.userEmail,
            thumb: userLogin.picture,
          }); // catch 에서 받아서 처리
        } else {
          // 트랜잭션 처리가 필요할 수도 있겠다 싶음... 하나로 묶어서 다른방법으로 처리하는 걸 모색해 봐야됨..
          const insertNo = await userDml.upsertFacebookUser({
            no: req.user.id,
            email: profile._json.email, // eslint-disable-line no-underscore-dangle
            name: profile.displayName,
            picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
            facebook: profile.id,
            token: accessToken,
          });

          const user = await userDml.selectUserByNo({
            userNo: insertNo,
          });

          done(null, {
            id: user.userNo,
            email: user.userEmail,
            thumb: user.picture,
          });
        }
      } else { // 요청정보에 유저에 대한 데이터가 없는경우 ..
        const userLogin = await userDml.selectFacebookLoginUser({
          cond: {
            id: profile.id,
          },
        });

        if (userLogin) { // 소셜로그인을 통해 로그인이된경우
          done(null, {
            id: userLogin.userNo,
            email: userLogin.userEmail,
            thumb: userLogin.picture,
          });
        } else {
          const insertNo = await userDml.upsertFacebookUser({
            email: profile._json.email, // eslint-disable-line no-underscore-dangle
            name: profile.displayName,
            picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
            token: accessToken,
            facebook: profile.id,
          });

          const user = await userDml.selectUserByNo({
            userNo: insertNo,
          });

          done(null, {
            id: user.userNo,
            email: user.userEmail,
            thumb: user.picture,
          });
        }
      }
    } catch (err) {
      done(err);
    }
  };

  fooBar().catch(done);
})
