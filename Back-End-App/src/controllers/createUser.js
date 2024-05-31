const User = require('../models/user');

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    user.accessLevel = "User";
    await user.save()
    return res.status(201).json(user);
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).send({ message: 'Email Already Exists' })
    }
    return res.status(500).json({ message: err });
  }
};


module.exports = createUser;