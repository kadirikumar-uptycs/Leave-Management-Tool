let express = require('express');
let controllers = require('./controllers');
let router = express.Router();

router.post('/user', controllers.createUser)
router.get('/users', controllers.getUsers)
router.put('/users/:id', controllers.editUser)
router.delete('/user/:id', controllers.deleteUser)
router.get('/leaveApplications', controllers.getLeaveApplications)
router.get('/holidays', controllers.getHolidaysList)

module.exports = router;