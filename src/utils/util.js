import _ from 'lodash';
import camel from 'to-camel-case';

const convertToCamel = (result) => {
  const camalResult = {};
  console.error(result);
  _.each(result, (v, k) => {
    camalResult[camel(k)] = _.isObject(v) ? convertToCamel(v) : result[k];
  });

  return camalResult;
};

export default {
  convertToCamel,
};
