const router = require("express").Router();

router.get("/users/signIn", (req, res) => {
  res.render("users/signin");
});

router.get("/users/signUp", (req, res) => {
  res.render("users/signup");
});

module.exports = router;
