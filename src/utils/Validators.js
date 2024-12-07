const { check, validationResult, body } = require('express-validator');


const validation = {
    tagValidation : [
        check('name').not().isEmpty().withMessage('no data').isString().withMessage('must be string')
    ],
    categoryValidation : [
        check('name').not().isEmpty().withMessage('no data').isString().withMessage('must be string')
    ],
    noteValidation : [
        check('content').not().isEmpty().withMessage('no data').isString().withMessage('must be string')
    ],
    userValidation : [
        check('firstname').not().isEmpty().withMessage('no first name'),
        check('lastname').not().isEmpty().withMessage('no last name'),
        check('email').not().isEmpty().withMessage('no email').isEmail().withMessage('invilid email uses'),
        check('password').not().isEmpty().withMessage('no data').isLength({ min: 4 })
        ]
}
// error validator handler
const errorValidatorHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array()[0].msg;
        return res.status(422).json({ message: firstError });
    }
    next();
};

module.exports = {validation, errorValidatorHandler}