"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("This is auth router");
});
router.post("/signup", async (req, res) => {
    const { email, name, phone, password, friends, groups } = req.body;
    const userExist = await User_1.default.findOne({ email });
    if (!userExist) {
        console.log(email);
        bcrypt_1.default.genSalt(10, function (err, salt) {
            if (err)
                return res.status(401).json("Something went wrong");
            bcrypt_1.default.hash(password, salt, function (err, hash) {
                const newUser = new User_1.default({
                    email,
                    name,
                    phone,
                    password: hash,
                    friends,
                    groups,
                });
                newUser.save();
                return res.status(200).json("User created");
            });
        });
        return;
    }
    return res.status(400).json({ err: "User already exists" });
});
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (user) {
        const flag = bcrypt_1.default.compareSync(password, user.password);
        if (flag) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, "sdjflserjpwo9iasvnlakesrj");
            res
                .cookie("accessToken", token, {
                httpOnly: true,
            })
                .status(200)
                .json("Logged in");
        }
        else {
            return res.status(400).json("wrong credentials");
        }
    }
    return res.status(404).send("User doesn't exist");
});
router.get("/test", (req, res) => {
    res.send("you are authenticated");
});
exports.default = router;
//# sourceMappingURL=auth.js.map