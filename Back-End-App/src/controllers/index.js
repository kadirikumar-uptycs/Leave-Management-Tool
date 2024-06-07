const getUsers = require('./getUsers');
const getUser = require('./getUser');
const createUser = require('./createUser');
const editUser = require('./editUser');
const deleteUser = require('./deleteUser');
const getLeaveApplications = require('./getLeaveApplications');
const getHolidaysList = require('./getHolidaysList');
const applyLeave = require('./applyLeave');
const approveLeave = require('./approveLeave');
const rejectLeave = require('./rejectLeave');
const getSessions = require('./getSessions');
const dismissNotification = require('./dismissNotification');


module.exports = {
    getUsers,
    getUser,
    createUser,
    editUser,
    deleteUser,
    getLeaveApplications,
    getHolidaysList,
    applyLeave,
    approveLeave,
    rejectLeave,
    getSessions,
    dismissNotification,
}