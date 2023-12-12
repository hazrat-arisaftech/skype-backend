"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//routes
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
require("dotenv").config();
const PORT = 3000;
const path = require("path");
app.get("/health", (req, res) => {
    res.send("Up and Running");
});
app.use(body_parser_1.default.json());
app.use(cookie_parser_1.default);
app.use("/api/v1", auth_1.default);
mongoose_1.default
    .connect("mongodb+srv://HazratAli:HazratAli@atlascluster.wenyq4j.mongodb.net/?retryWrites=true&w=majority/Skype", {
    writeConcern: { w: "majority" },
})
    .then(() => {
    app.listen(3000, () => {
        console.log(`Running on port 3000`);
    });
})
    .catch((e) => {
    console.log(e);
});
module.exports = app;
//# sourceMappingURL=server.js.map