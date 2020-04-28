let jwt = require('jsonwebtoken');

/**
 * Only Logged user are allowed to access few APIs
 * @return {[type]}       [description]
 */
let authorize = () => {
    return [
        (req, res, next) => {
            var token = req.headers['x-access-token'];
            if (!token)
                return res.status(403).send({ error: 'No token provided.' });

            jwt.verify(token, 'mohitkadel', function(err, decoded) {
                if (err)
                    return res.status(403).send({ error: 'Failed to authenticate token.' });

                // if everything good, save to request for use in other routes
                req.id = decoded.id;
                req.role = decoded.role;
                next();
            })
        }
    ];
}

module.exports = authorize;