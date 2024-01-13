const User = require("../models/users");

const deleteSingleUser = async (req, res) => {
  const email = req.query.email;
  const query = { email: email };
  const result = await User.deleteOne(query);
  res.send(result);
};

module.exports = deleteSingleUser;
