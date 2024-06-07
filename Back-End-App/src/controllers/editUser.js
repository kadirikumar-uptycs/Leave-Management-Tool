const User = require('../models/user');

const editUser = async (req, res) => {
	try {
		let userId = req.params.id;
		let updatedData = req.body;
		const updatedUserInfo = await User.findByIdAndUpdate(
			userId,
			{
				$set: updatedData
			},
			{ new: true }
		);
		return res.status(200).send(updatedUserInfo);
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = editUser