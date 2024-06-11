const User = require('../models/user');
const {sendNewUserNotificationMail} = require('../helpers/mailSender');
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    user.accessLevel = "User";
    await user.save();
    sendNewUserNotificationMail(user?.name, user?.email);
    return res.status(201).json(user);
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).send({ message: 'Email Already Exists' })
    }
    console.log("error while creating new user", err);
    return res.status(500).json({ message: err });
  }
};


module.exports = createUser;