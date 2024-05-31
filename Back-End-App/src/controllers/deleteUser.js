const User = require('../models/user');

const deleteUser = async (req, res) => {
  try {
    let userId = req.params.id;
    await User.findByIdAndDelete(userId);
    return res.status(200).send('User deleted successfully');
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = deleteUser