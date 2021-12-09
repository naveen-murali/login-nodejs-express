
module.exports = {
    isUserIn: (req, res, next) => {
        if (req.session.user)
            res.redirect('/');
        else
            next();
    },

    isUserHome: (req, res, next) => {
        if (req.session.user)
            next();
        else
            res.redirect('/login');
    },

    isAdminIn: (req, res, next) => {
        if (req.session.admin)
            res.redirect('/admin');
        else
            next();
    },

    isAdminHome: (req, res, next) => {
        if (req.session.admin)
            next();
        else
            res.redirect('/admin/login');
    }
}