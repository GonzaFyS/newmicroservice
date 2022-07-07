import {ConnectionOptions} from "typeorm";
import dotenv from 'dotenv';
dotenv.config();


import path = require('path');

const isCompiled = path.extname(__filename) === 'js';

export default {
    "type": `${process.env.DB_TYPE || 'mysql'}`,
    "host": `${process.env.DB_HOST || 'localhost'}`,
    "port": `${process.env.DB_PORT || 23306}`,
    "username": `${process.env.DB_USER || 'example'}`,
    "password": `${process.env.DB_PASS || 'example'}`,
    "database": `${process.env.DB_NAME || 'example'}`,
    "entities": [
        `./src/entity/**/*.${isCompiled ? 'js' : 'ts'}`,
    ],
 } as ConnectionOptions;