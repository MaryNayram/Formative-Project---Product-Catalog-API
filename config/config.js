const config = {
  DATABASE_URL: process.env.MONGO_URI,
  SERVER_PORT: process.env.PORT ?? 5000
};

module.exports = config;
