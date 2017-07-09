const routers = [
  'auth',
  'index',
  'user',
];

routers.forEach((router) => {
  module[router] = require(`./${router}`); // eslint-disable-line global-require, no-dynamic-require
});
