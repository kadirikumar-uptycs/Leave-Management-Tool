const LeaveApplication = require('../models/leaveApplication');

let getLeaveApplications = async (req, res) => {
    try{
        let applications = await LeaveApplication.find({});
        return res.status(200).send(applications);
    }catch(err){
        return res.status(500).send(err)
    }
}

module.exports = getLeaveApplications;