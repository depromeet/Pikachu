export default {
  insert: {
    singUp: `
      INSERT INTO TB_MEMBER (MBR_EMAIL, MBR_NAME, PASSWORD)
      VALUES (?, ?, ?)
    `,
    insertFacebookUser: `
      INSERT INTO TB_MEMBER (MBR_EMAIL, MBR_NAME, SOCIAL_VENDOR, PICTURE, SOCIAL_ID, TOKEN, AUTH_YN)
      VALUES (?, ?, 'facebook', ?, ?, ?, 'Y')
    `,
  },

  select: {
    deserializeUser: `
      SELECT * FROM TB_MEMBER
      WHERE MBR_NB=?
    `,
    localLogin: `
      SELECT * FROM TB_MEMBER
      WHERE MBR_EMAIL = ?
    `,
    facebookLoginCheck: `
      SELECT * FROM TB_MEMBER
      WHERE SOCIAL_VENDOR=? AND SOCIAL_ID=?
    `,
  },
};
