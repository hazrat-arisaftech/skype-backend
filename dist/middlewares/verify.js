const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    console.log("Test coookies", token);
    if (!token)
        return res.status(401).json("You are not logged in ");
    jwt.verify(token, process.env.jwt_secret, (err, user) => {
        if (err) {
            return res.status(401).json("Invalid token");
        }
        else {
            req.user = user;
            next();
        }
    });
};
module.exports = verifyToken;
//# sourceMappingURL=verify.js.map