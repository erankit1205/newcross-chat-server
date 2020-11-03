const jwt = require('jsonwebtoken');

const verify = (request, response, next) => {
    if (request.header("authorization")) {
        const authorization = request.header("authorization").split(" ");
        const authType = authorization[0] || null;
        const token = authorization[1] || null;

        if (authType == "Bearer" && token) {
            decodeToken(token)
                .then((data) => {
                    request.user = data;
                    next();
                })
                .catch((err) => {
                    next(err);
                });
        } else {
            next("Invalid parameters");
        }
    } else {
        next("Invalid parameters");
    }
};

const decodeToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.SECRET,
            (err, decoded) => {
                if (err) {
                    if (err.name == "TokenExpiredError")
                        reject("Token has expired");
                    else reject("Token is invalid");
                } else {
                    resolve(tokenDataToPrincipal(decoded));
                }
            }
        );
    });
};

const tokenDataToPrincipal = (data) => data.user;

exports.verify = verify;