const helpers = {};
helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash(
      "error_msg",
      "Tienes que haber iniciado sesión para poder acceder"
    );
    res.redirect("/users/signin");
  }
};

module.exports = helpers;
