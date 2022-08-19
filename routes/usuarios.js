const { Router } = require("express");
const { check } = require("express-validator");
const { validateInputs } = require("../middelwares/validate-inputs");

const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usersGet);

router.put("/:id", usersPut);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    check(
      "password",
      "La contraseña es obligatoria y mas de 6 letras."
    ).isLength({ min: 6 }),
    check("email", "El correo no es valido").isEmail,
    check("role", "No es un rol valido.").isIn(["ADMIN", "USER"]),
    validateInputs,
  ],
  usersPost
);

router.delete("/", usersDelete);

router.patch("/", usersPatch);

module.exports = router;
