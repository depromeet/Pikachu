/* eslint-disable object-shorthand, func-names */
import _ from 'lodash';
import connection from './connection'; // connection에 대한 정보가 변경이 되면 계속 이걸 모든 파일에서 바꿔줘야되는데.. 효율적인 방법을 찾아야 할듯..

export default {
  selectOne: async function (queryString, param) {
    const list = await this.executeQuery(queryString, param);
    return list['0'];
  },


  /**
   * @todo list의 길이를 포함해서 반환하도록 만들어야 됩니다.
   *
   * @param {string} queryString
   * @param {string} param
   * @returns {object} result
   */
  selectList: async function (queryString, param) {
    const list = await this.executeQuery(queryString, param);
    const result = {
      list: _.values(list),
      count: _.keys(list).length,
    };
    return result;
  },

  insert: async function (queryString, param) {
    const result = await this.executeQuery(queryString, param);
    return result.insertId;
  },

  executeQuery: async (queryString, param) => {
    const result = await connection.query(queryString, param);
    return result;
  },
};
