const router = require("express").Router();

router.get("/users/signIn", (req, res) => {
  res.send("Inicio de sesión");
});

router.get("/users/signUp", (req, res) => {
  res.send("Registro");
});

module.exports = router;
