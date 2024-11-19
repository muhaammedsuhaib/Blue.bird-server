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
const node_cron_1 = __importDefault(require("node-cron"));
const storie_model_1 = __importDefault(require("../modules/storie/storie.model"));
node_cron_1.default.schedule("0 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = new Date();
    const timeLimit = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);
    try {
        const result = yield storie_model_1.default.updateMany({ postedAt: { $lt: timeLimit }, isArchived: false }, { $set: { isArchived: true } });
        console.log(`${result.modifiedCount} stories archived.`);
    }
    catch (error) {
        console.error("Error archiving stories:", error);
    }
}));
