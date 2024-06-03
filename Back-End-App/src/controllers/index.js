const getUsers = require('./getUsers');
const createUser = require('./createUser');
const editUser = require('./editUser');
const deleteUser = require('./deleteUser');
const getLeaveApplications = require('./getLeaveApplications');
const getHolidaysList = require('./getHolidaysList');
const applyLeave = require('./applyLeave');
const approveLeave = require('./approveLeave');
const rejectLeave = require('./rejectLeave');
const getSessions = require('./getSessions');
module.exports = {
    getUsers,
    createUser,
    editUser,
    deleteUser,
    getLeaveApplications,
    getHolidaysList,
    applyLeave,
    approveLeave,
    rejectLeave,
    getSessions,
}