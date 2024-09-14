"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errorSources = [
        {
            path: error.path,
            message: 'Invalid id',
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Cast error.',
        errorSources,
    };
};
exports.default = handleCastError;
