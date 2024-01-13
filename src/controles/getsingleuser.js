const User = require("../models/users");

const getSingleUser = async (req, res) => {
  const email = req.query.email;
  const query = { email: email };
  const result = await User.findOne(query);
  res.send(result);
};

module.exports = getSingleUser;