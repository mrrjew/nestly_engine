"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the user profile schema
const userProfileSchema = new mongoose_1.default.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    address: { type: String, required: true }
});
// Define the user schema
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type: userProfileSchema, required: true },
    type: { type: String, enum: ['OWNER', 'AGENT', 'RENTER'], required: true }
});
// Create the Mongoose model for user
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
