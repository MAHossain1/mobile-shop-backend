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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const LoginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistsByEmail(payload.email);
    // Whether the user exists or not.
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found!');
    }
    const isPasswordMatch = yield user_model_1.User.isPasswordMatch(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Your password is incorrect!');
    }
    const jwtPayload = {
        userEmail: user.email,
        role: user.role,
    };
    // create  accessToken
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_token, config_1.default.jwt_access_expires_in);
    // generate refresh token
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_token, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        data: user,
    };
});
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(userData);
    const user = yield user_model_1.User.isUserExistsByEmail(userData.userEmail);
    //   console.log('user from controller', user);
    // Whether the user exists or not.
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found!');
    }
    //   const isPasswordMatch = await User.isPasswordMatch(
    //     payload?.oldPassword,
    //     user?.password
    //   );
    //   if (!isPasswordMatch) {
    //     throw new AppError(httpStatus.BAD_REQUEST, 'Your password is incorrect!');
    //   }
    //checking if the password is correct
    if (!(yield user_model_1.User.isPasswordMatch(payload.oldPassword, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password do not matched');
    // hash new password
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcyrpt_salt_rounds));
    const result = yield user_model_1.User.findOneAndUpdate({
        email: userData.email,
        role: userData.role,
    }, {
        password: newHashedPassword,
    });
    return result;
});
exports.AuthServices = {
    LoginUser,
    changePassword,
};
