"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (error) => {
    const regexPattern = /dup key: { name: "(.*?)" }/;
    // Use the match method to extract the value
    const match = error.message.match(regexPattern);
    const extracted_message = match && match[1];
    const errorSources = [
        {
            path: '',
            message: `${extracted_message} is already exists!`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Cast error.',
        errorSources,
    };
};
exports.default = handleDuplicateError;
