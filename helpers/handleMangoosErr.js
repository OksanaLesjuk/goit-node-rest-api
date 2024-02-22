export const handleMangoosErr = (err, data, next) => {
    err.status = 400;
    next()
}

