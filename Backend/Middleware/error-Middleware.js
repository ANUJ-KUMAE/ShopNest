const errorMiddleware = (err, req, resp, next) => {
    const status = err.status || 501;
    const message = err.message || "Internal Server Error";
    const extraDetails = err.extraDetails || "Error from Backend";

    return resp.status(status).json({message, extraDetails});
}

module.exports = errorMiddleware;