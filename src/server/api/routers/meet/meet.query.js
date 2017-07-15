export default {
  insert: {},
  select: {
    selectMeetList: `
      SELECT * FROM (
        SELECT
          MEET_NO,
          REQ_USER_NO,
          (SELECT USER_NAME FROM TB_USER_INFO WHERE USER_NO = REQ_USER_NO) USER_NM,
          IFNULL(CRTE_CMNT_NO,'') CRTE_CMNT_NO,
          IFNULL((SELECT CMNT_NM FROM TB_COMMUNITY WHERE CMNT_NO = CRTE_CMNT_NO),'') CMNT_NM,
          TITLE,
          DESCRIPTION,
          MEET_STRT_DT,
          MEET_END_DT,
          LAT,
          LNG,
          ADDRESS,
          MAX_JOIN_CNT,
          (SELECT COUNT(*) FROM TB_MEET_JOIN WHERE MEET_NO = A.MEET_NO AND CANCLE_YN='N' AND CONFIRM_YN='Y' AND USE_YN='Y') JOIN_CNT,
          SHARE_YN,
          PUBLIC_YN
        FROM (
          SELECT * FROM TB_MEET WHERE USE_YN='Y' AND PUBLIC_YN='Y'
          UNION ALL
          SELECT * FROM (
            SELECT T_M.* FROM (
              SELECT
                *
              FROM TB_MEET
              WHERE USE_YN='Y'
              AND PUBLIC_YN='N' # 비공개 모임만 가지고 온다.
              AND MEET_END_DT > NOW()

            ) T_M
            INNER JOIN (
              SELECT
                CMNT_NO
              FROM TB_JOIN_CMNT
              WHERE APPROVAL_YN='Y' AND USER_NO=?  # 해당 유저가 가입한 커뮤니티에 대한 정보
            ) T_JC
            ON T_JC.CMNT_NO = T_M.CRTE_CMNT_NO
          ) T_PRIVATE_MEET
        ) A
      ) T_OPEN_MEET
    `,
  },
};
