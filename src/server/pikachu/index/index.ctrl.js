

const getIndex = (req, res) => {
  res.render('index');
};

const getLogin = (req, res) => {
  res.render('login');
};

export default {
  getIndex,
  getLogin,
};
