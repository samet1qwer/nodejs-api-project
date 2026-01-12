const winston = require("winston");
const { format } = winston;
const { combine } = format;
require("winston-mongodb");

module.exports.logger = winston.createLogger({
  level: "debug",
  format: combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.json(),
    format.prettyPrint()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      db: "mongodb://127.0.0.1:27017/shopapp",
      level: "debug",
      options: { useUnifiedTopology: true },
      collection: "logs",
    }),
  ],
});
