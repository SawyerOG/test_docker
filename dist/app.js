"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = require("fs");
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const port = 8080;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: ['127.0.0.1'] }));
// log only 4xx and 5xx responses to console
app.use((0, morgan_1.default)('dev', {
    skip: function (req, res) {
        return res.statusCode < 400;
    },
}));
// log all requests to access.log
app.use((0, morgan_1.default)('common', {
    stream: (0, fs_1.createWriteStream)(path_1.default.join(__dirname, 'access.log'), { flags: 'a' }),
}));
function error(err, req, res, next) {
    console.log('error');
    // log it
    console.error(err.stack);
    // respond with 500 "Internal Server Error".
    // res.;
    res.status(500).send('Internal Server Error');
}
app.use(error);
app.get('/', function (req, res, next) {
    console.log('hit');
    const { error, throwErr } = req.query;
    console.log(throwErr == 1);
    if (throwErr == 1)
        return next(new Error('who am i'));
    const code = error == 1 ? 404 : 200;
    res.status(code).send('hello, world!');
});
app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});
app.listen(port, () => {
    console.log('Express started on port ' + port);
});
