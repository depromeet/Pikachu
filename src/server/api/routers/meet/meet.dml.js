import query from './meet.query';
import queryExcute from '../../../database/queryExcute';

const selectOpenMeetList = data => queryExcute.selectList(
                                    query.select.selectMeetList,
                                    data.cond.userNo,
                                  );

export default {
  selectOpenMeetList,
};
