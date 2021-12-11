const express = require('express');
const router = express.Router();
const { body, validationResult, check } = require('express-validator');


// @desc        For vaification of name.
// @rout        POST /validate/name
router.post(
    "/name",
    check('name')
        .isLength({ min: 4 })
        .withMessage("Name should have min-length of 4"),
    (req, res) => {
        const errors = validationResult(req);

        let resData;
        if (errors.isEmpty())
            resData = { status: true };
        else
            resData = { status: false, reason: errors.mapped().name.msg };

        res.status(200).json(resData);
    }
);


// @desc        For vaification of email.
// @rout        POST /validate/email
router.post(
    "/email",
    body('email')
        .isEmail()
        .withMessage("Enter a valid email"),
    (req, res) => {
        const errors = validationResult(req);
        let resData;
        if (errors.isEmpty())
            resData = { status: true };
        else
            resData = { status: false, reason: errors.mapped().email.msg };

        res.status(200).json(resData);
    }
);


// @desc        For vaification of password.
// @rout        POST /validate/password
router.post(
    "/password",
    check('password')
        .isLength({ min: 3 })
        .withMessage("Password should have a min-length of 3"),
    (req, res) => {
        const errors = validationResult(req);
        let resData;
        if (errors.isEmpty())
            resData = { status: true };
        else
            resData = { status: false, reason: errors.mapped().password.msg };

        res.status(200).json(resData);
    }
);


// @desc        For vaification of password.
// @rout        POST /validate/confirmPassword
router.post(
    "/confirmPassword",
    check('confirmPassword')
        .isLength({ min: 3 })
        .withMessage("Password should have a min-length of 3")
        .custom((value, { req }) => req.body.password === value)
        .withMessage("Password does not matches"),
    (req, res) => {
        const errors = validationResult(req);

        let resData;
        if (errors.isEmpty())
            resData = { status: true };
        else
            resData = { status: false, reason: errors.mapped().confirmPassword.msg };

        res.json(resData);
    }
);


module.exports = router