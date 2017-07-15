import meetDML from './meet.dml';

const getOpenMeetList = async (req, res) => {
  console.info(req.user);
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
