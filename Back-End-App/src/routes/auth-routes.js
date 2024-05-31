require('dotenv').config();
const express = require('express');
const passport = require('passport');


const router = express.Router();

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
    });
    res.redirect(`${process.env.UI_BASE_URL}/login`);
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/unauthorized',
    failureMessage: true
}), (req, res) => {
    res.redirect(`${process.env.UI_BASE_URL}/`);
});

router.get('/unauthorized', (req, res) => {
    const errorMessage = req.session.messages ? req.session.messages[0] : null;
    req.session.messages = [];
    res.status(401).send(errorMessage || 'You are not authorized to access this website.');
});


module.exports = router;