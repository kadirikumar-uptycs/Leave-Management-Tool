const mongoose = require('mongoose');

let getSessions = async (req, res) => {
    try{
        let accessLevel = req?.user?.accessLevel;
        if(accessLevel !== 'Admin'){
            return res.status(403).send({message: "Unauthorized: Admin access required"})
        }
        let sessions = await mongoose.connection.db.collection('sessions').find({}).toArray();
        return res.status(200).send(sessions);
    }catch(err){
        return res.status(500).send(err);
    }
}

module.exports = getSessions;