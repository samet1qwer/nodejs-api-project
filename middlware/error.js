const logger = require("./logger");
module.exports.error = (err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ message: "Something went wrong" });
};
