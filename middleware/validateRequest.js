const Joi = require("joi");

const requestValidator = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body, { abortEarly: false });

    if (validationResult.error) {
        return res.status(422).json({
            status: "error",
            message: "Input validation failed",
            details: validationResult.error.details.map((err) => err.message),
        });
    }

    next();
};

module.exports = requestValidator;
