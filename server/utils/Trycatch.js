const Trycatch = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };
};
module.exports = Trycatch;
