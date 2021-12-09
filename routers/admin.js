const express = require('express');
const router = express.Router();

// local middlewares
const { isAdminIn, isAdminHome } = require("../middleware/auth");

// helper funtions
const adminHelper = require('../helpers/adminHelper');


// @desc        For admin template
// @rout        /admin
router.get('/', isAdminHome, (req, res) => {
    adminHelper.GET_USERS()
        .then(clients => {
            res.render(
                "admin/home",
                { layout: "admin", handler: "Admin", title: "Home | Admin", clients }
            );
        })
        .catch(reject => {
            res.render(
                'admin/home',
                { layout: "admin", handler: "Admin", title: "Home | Admin", reason: reject.reason }
            )
        })
})


// @desc        For admin login template
// @rout        /admin/login
router.get('/login', isAdminIn, (req, res) => {
    res.render(
        'login',
        { layout: 'login', title: "Login | Admin", handler: "Admin", loginRoute: "/admin/login" }
    );
})


// @desc        For admin login template
// @rout        /admin/login
router.post('/login', (req, res) => {
    adminHelper.CHECK_ADMIN(req.body)
        .then((admin) => {
            req.session.admin = admin;
            res.redirect('/admin');
        })
        .catch((reject) => {
            req.flash("errorMessage", reject.reason);
            res.redirect("/admin/login");
        });
})


// @desc        For admin login template
// @rout        /admin/deleteUser/:email
router.get('/deleteUser/:email', isAdminHome, (req, res) => {
    adminHelper.DELETE_USER(req.params.email)
        .then(status => {
            req.flash("successMessage", status.message);
            res.redirect('/admin');
        })
        .catch(err => {
            req.flash("errorMessage", err.message);
            res.redirect('/admin');
        });
})


// @desc        For admin login template
// @rout        /admin/addUser  
router.get('/addUser', isAdminHome, (req, res) => {
    res.render('admin/addUser', { layout: "admin", title: "Add user | Admin", handler: "Admin" });
})


// @desc        For admin login template
// @rout        /admin/logout
router.get('/logout', isAdminHome, (req, res) => {
    delete req.session.admin;
    res.redirect('/admin');
})

module.exports = router;