const User = require('../models/user');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = getAllUsers