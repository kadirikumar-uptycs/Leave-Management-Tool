const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const dbName = process.env.MONGO_DB_NAME;
const url = `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`;

module.exports = url