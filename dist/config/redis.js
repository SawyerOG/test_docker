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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
class Redis {
    constructor() {
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.redis.connect();
                console.log('REDIS HAS CONNECT');
            }
            catch (err) {
                console.log('REDIS FAILED');
                console.error(err);
                process.exit();
            }
        });
        this.get = (key) => __awaiter(this, void 0, void 0, function* () {
            try {
                const val = yield this.redis.get(key);
                if (val) {
                    return JSON.parse(val);
                }
                return undefined;
            }
            catch (err) {
                console.error(err);
            }
        });
        const client = (0, redis_1.createClient)();
        // client.connect();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        this.redis = client;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        this.subClient = client.duplicate();
        client.on('error', (err) => {
            console.log('Redis Client Error', err);
            if (err.code && err.code === 'ECONNREFUSED') {
                process.exit();
            }
        });
    }
}
exports.default = new Redis();
