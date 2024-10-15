"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const orderProducts_1 = __importDefault(require("./handlers/orderProducts"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get("/", function (req, res) {
    res.send("Hello World!");
});
(0, orderProducts_1.default)(app);
app.listen(PORT, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
