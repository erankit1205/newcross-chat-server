const jwt  = require("jsonwebtoken");
const users = [
    {
        "username" : "test1",
        "password" : "test1"
    },
    {
        "username" : "test2",
        "password" : "test2"
    }
]

const validateUser = (username, password) => users.find((user) => user.username === username && user.password === password);


const generateToken = (username, password) => {
    const user = validateUser(username, password);
    if(!user) {
        return "Invalid credentials";
    } else {
        return {token: jwt.sign({user: username}, process.env.SECRET, {expiresIn: process.env.TOKEN_EXPIRY})};
    }   
}

exports.generateToken = generateToken;