export const handleMangoosErr = (err, data, next) => {
    const { name, code } = err;
    console.log(name);
    console.log(code);
    const status = (name === 'MongoServerError' & code === 11000) ? 409 : 400;

    err.status = status;
    next()
}

