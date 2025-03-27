const handleErrors = (error, req, res, next) => {
    console.error("Error Log:", error.stack);

    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "An unexpected error occurred";

    return res.status(statusCode).json({
        success: false,
        error: {
            code: statusCode,
            description: errorMessage,
        },
    });
};

module.exports = handleErrors;
