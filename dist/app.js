"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const redis_1 = __importDefault(require("./config/redis"));
redis_1.default.connect();
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
app.get('/ping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const v = yield redis_1.default.get('who');
    if (v) {
        console.log('redis is connected');
        res.status(200).send('pong ' + v);
    }
}));
app.listen(port, () => {
    console.log('Express started on port ' + port);
});
