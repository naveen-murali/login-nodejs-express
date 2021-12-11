const express = require('express');
const router = express.Router();
const { body, validationResult, check } = require('express-validator');

// local modules.
const userHelper = require('../helpers/userHelpers');
const { isUserIn, isUserHome } = require('../middleware/auth');


// @desc        For home template.
// @rout        GET /
router.get("/", isUserHome, (req, res) => {
    userHelper.GET_BLOG()
        .then(datas => {
            res.render(
                'user/home',
                { title: "Home", handler: "User", datas }
            );
        })
        .catch(reject => {
            res.render(
                'user/home',
                { title: "Home", handler: "User", reason: reject.reason }
            );
        });
});


// @desc        For showing in list.
// @rout        GET /showInList
router.get("/showInList", isUserHome, (req, res) => {
    userHelper.GET_BLOG()
        .then(datas => {
            res.render(
                'user/showInList',
                { title: "List display", handler: "User", datas }
            );
        })
        .catch(reject => {
            res.render(
                'user/showInList',
                { title: "List display", handler: "User", reason: reject.reason }
            );
        });
});


// @desc        For login template.
// @rout        GET /
router.get("/login", isUserIn, (req, res) => {
    res.render(
        'login',
        { layout: 'login', handler: "User", title: "Login", loginRoute: "/login" }
    );
});


// @desc        For login submission.
// @rout        POST /login
router.post("/login", (req, res) => {
    userHelper.CHECK_USER(req.body)
        .then(user => {
            req.session.user = user;
            res.redirect('/');
        })
        .catch(err => {
            req.flash('errorMessage', err.reason);
            res.redirect('/login');
        });
});


// @desc        For logout
// @rout        POST /logout
router.get("/logout", (req, res) => {
    delete req.session.user;
    res.redirect('/login');
})

module.exports = router;