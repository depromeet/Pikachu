export default {
  insert: {
    singUp: `
      INSERT INTO TB_USER_INFO (USER_EMAIL, USER_NAME, PASSWORD)
      VALUES (?, ?, ?)
    `,
    upsertFacebookUser: `
      INSERT INTO TB_USER_INFO (USER_NO, USER_EMAIL, USER_NAME, PICTURE, FACEBOOK, FACEBOOK_TOKEN, AUTH_YN)
      VALUES (?, ?, ?, ?, ?, ?, 'Y')
      ON DUPLICATE KEY UPDATE
        USER_EMAIL = ?,
        USER_NAME = ?,
        PICTURE = ?,
        FACEBOOK = ?,
        FACEBOOK_TOKEN = ?,
        AUTH_YN = 'Y'
    `,
    upsertSocialUser: socialName => `
        INSERT INTO TB_USER_INFO (USER_NO, USER_EMAIL, USER_NAME, PICTURE, ${socialName}, ${socialName}_TOKEN, AUTH_YN)
        VALUES (?, ?, ?, ?, ?, ?, 'Y')
        ON DUPLICATE KEY UPDATE
          USER_EMAIL = ?,
          USER_NAME = ?,
          PICTURE = ?,
          ${socialName} = ?,
          ${socialName}_TOKEN = ?,
          AUTH_YN = 'Y'
      `,
    insertFacebookUser: `
      INSERT INTO TB_USER_INFO (USER_EMAIL, USER_NAME, PICTURE, FACEBOOK, FACEBOOK_TOKEN, AUTH_YN)
      VALUES (?, ?, ?, ?, ?, 'Y')
    `,
  },

  select: {
    selectUserByNo: `
      SELECT * FROM TB_USER_INFO
      WHERE USER_NO=?
    `,
    selectUserByEmail: `
      SELECT * FROM TB_USER_INFO
      WHERE USER_EMAIL = ?
    `,
    selectUserByFacebook: `
      SELECT * FROM TB_USER_INFO
      WHERE FACEBOOK=?
    `,
    selectUserBySocial: `
      SELECT * FROM TB_USER_INFO
      WHERE ?=?
    `,
  },
};
