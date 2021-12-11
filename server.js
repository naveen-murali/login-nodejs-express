const httpError = require('http-errors');
const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');

// environment variable.
dotenv.config({ path: "./config/config.env" });


//! creating the app.--------------------------------------------------------------------------------
const app = express();
const PORT = process.env.PORT || 3000;

// loging only only in development mode.
if (process.env.NODE_ENV === "development")
    app.use(morgan("dev"));

// file submission
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting static files.
app.use(express.static(path.join(__dirname + '/public')));


// setting up the view engine.
app.engine(
    ".hbs",
    hbs.engine({
        defaultLayout: 'main',
        extname: '.hbs',
        helpers: {
            checkHandler: (handler) => {
                return handler === "Admin";
            }
        }
    })
)
app.set('view engine', '.hbs');


// session middleware.
app.use(
    session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        rolling: true,
        saveUninitialized: false,
        cookie: {
            secure: false //TODO: change it into true after https is done.
        }
    })
)
if (process.env.NODE_ENV === "production")
    app.set('trust proxy', 1); //TODO: also set cookie true.


// for transfering some common datas.
app.use(flash());
app.use((req, res, next) => {
    // to remove showing the login page. so removing the caching.
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");

    res.locals.errorMessage = req.flash("errorMessage");
    res.locals.successMessage = req.flash("successMessage");

    if (req.session.user) {
        res.locals.userName = req.session.user.name;
        res.locals.userEmail = req.session.user.email;
    }
    if (req.session.admin) {
        res.locals.adminName = req.session.admin.name;
        res.locals.adminEmail = req.session.admin.email;
    }
    next();
})


// setting the routers
app.use("/", require('./routers/user'));
app.use("/admin", require('./routers/admin'));
app.use("/validate", require("./routers/validate"))


// catch and forwards to the error handler
app.use((req, res, next) => {
    next(httpError(404));
})
// error handling
app.use((err, req, res, next) => {
    // saving to a local local key/obj to access straight from the hbs.
    res.locals.message = "The page you are looking for was not found." || err.message;
    res.locals.error = req.app.get('env') === "development" ? err : err.status;

    // if the not found error isn't there it will shows '500: server error';
    res.status(err.status || 500);
    res.render('error', { layout: "error", title: res.locals.message });
})

// listening to the port.
app.listen(
    PORT,
    () =>
        console.log(`Server is running on port ${PORT}\naccess on [ http://localhost:${PORT} ]`)
);
//! -------------------------------------------------------------------------------------------------