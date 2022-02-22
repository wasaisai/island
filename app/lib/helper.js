function success(msg, errorCode) {
    throw global.errs.Success(msg, errorCode)
}

module.exports = success;