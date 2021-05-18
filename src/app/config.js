const { resolve } = require('path');
const { readFileSync } = require('fs');
require('dotenv').config();

const PRIVATE_KEY = readFileSync(resolve(__dirname, './keys/private.key'));
const PUBLIC_KEY = readFileSync(resolve(__dirname, './keys/public.key'));
module.exports = { ...process.env, PRIVATE_KEY, PUBLIC_KEY };
