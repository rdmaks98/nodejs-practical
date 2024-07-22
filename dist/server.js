"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
console.log(config_1.PORT);
const port = config_1.PORT;
console.log(`Server is running on port ${port}`);
const message = 'Hello, TypeScript with Node.js!';
console.log(message);
