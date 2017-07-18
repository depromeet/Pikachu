import meetDML from './meet.dml';

const getOpenMeetList = async (req, res) => {
  if (!req.user) {
    res.send({
      success: false,
      error: 'please login',
      code: 405,
    });
  }

  const meetList = await meetDML.selectOpenMeetList({
    cond: {
      userNo: req.user.id,
    },
  });
  res.send(meetList);
};

export default {
  getOpenMeetList,
};
