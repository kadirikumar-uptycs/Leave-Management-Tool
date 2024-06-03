require('dotenv').config()
let express = require('express');
let controllers = require('../controllers');
let router = express.Router();

const isAuthenticated = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.status(401).send('Unauthorized!');
        }
    } catch (err) {
        if (err.code === 'ECONNRESET') {
            return res.status(500).send('Connection was reset by the server');
        } else {
            return res.status(500).send('An unexpected error occurred');
        }
    }
};


router.get('/isAuthenticated', isAuthenticated, (req, res) => res.status(200).send('Authorized!'))
router.get('/api', isAuthenticated, (req, res) => res.status(200).send(req?.user));
router.post('/user', isAuthenticated, controllers.createUser)
router.get('/users', isAuthenticated, controllers.getUsers)
router.put('/user/:id', isAuthenticated, controllers.editUser)
router.delete('/user/:id', isAuthenticated, controllers.deleteUser)
router.get('/leaveApplications', isAuthenticated, controllers.getLeaveApplications)
router.get('/sessions', isAuthenticated, controllers.getSessions)
router.post('/applyLeave', isAuthenticated, controllers.applyLeave)
router.put('/approveLeave/:id', isAuthenticated, controllers.approveLeave)
router.put('/rejectLeave/:id', isAuthenticated, controllers.rejectLeave)
router.get('/holidays', isAuthenticated, controllers.getHolidaysList)

module.exports = router;