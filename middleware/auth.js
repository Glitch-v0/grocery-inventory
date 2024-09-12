const checkPassword = (req, res, next) => {
  const password = req.cookies["password"];

  if (password !== "correct_password") {
    return res.status(403).send("Forbidden: Incorrect password");
  }

  next(); // Proceed to the next middleware or route handler
};

module.exports = { checkPassword };
