const winston = require("winston");
const { format } = winston;
const { combine } = format;

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
  ],
});
