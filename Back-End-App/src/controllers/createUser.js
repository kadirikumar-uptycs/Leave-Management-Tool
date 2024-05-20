const User = require('../models/user');

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save()
    res.status(201).json(user);
  } catch (err) {
    if(err?.code === 11000){
      return res.status(409).send({error: 'Email Already Exists'})
    }
    return res.status(500).json({ error: err });
  }
};


module.exports = createUser;