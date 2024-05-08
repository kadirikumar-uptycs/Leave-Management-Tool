let express = require('express');
let router = express.Router();

// Routes
router.get('/', (req, res) => {
    return res.status(200).send("Hello World!!!");
})

module.exports = router;