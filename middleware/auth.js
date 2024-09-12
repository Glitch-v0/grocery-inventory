const checkAdminStatus = (req, res, next) => {
  const admin = req.cookies.admin;

  if (admin !== "true") {
    return res.render("index", { error: "You do not have admin access." });
  }

  next(); // Proceed to the next middleware or route handler
};

module.exports = { checkAdminStatus };
