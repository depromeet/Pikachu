export default {
  insert: {
    singUp: `
      INSERT INTO TB_MEMBER (MBR_EMAIL, MBR_NAME, PASSWORD)
      VALUES (?, ?, ?)
    `,
  },

  select: {
    localLogin: `
      SELECT * FROM TB_MEMBER
      WHERE MBR_EMAIL = ?
    `,
    facebookLoginCheck: `
      SELECT * FROM TB_MEMBER
      WHERE VENDER=? AND TOKEN=?
    `,
  },
};
