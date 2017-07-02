import connection from '../../database/connection'; // connection에 대한 정보가 변경이 되면 계속 이걸 모든 파일에서 바꿔줘야되는데.. 효율적인 방법을 찾아야 할듯..

export default {
  selectOne: async function (queryString, param) {
    const list = await this.selectList(queryString, param);
    return list['0'];
  },

  selectList: async (queryString, param) => {
    const result = await (connection.query(queryString, param));
    return result;
  },
};
