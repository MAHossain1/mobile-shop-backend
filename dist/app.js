"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const notFound_1 = __importDefault(require("./app/config/middlewares/notFound"));
const globalErrorHandler_1 = __importDefault(require("./app/config/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const corsOptions = {
    origin: 'http://localhost:3000', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow credentials like cookies and headers
};
// Use the CORS middleware with options
app.use((0, cors_1.default)(corsOptions));
app.use('/api/v1', routes_1.default);
app.use(globalErrorHandler_1.default);
app.get('/', (req, res) => {
    res.send('Hello Bangladesh of the World!');
});
app.use(notFound_1.default);
exports.default = app;
