const { Router } = require("express");
const { check } = require("express-validator");
const { validateInputs } = require("../middlewares/validate-inputs");
const {
  isRole,
  emailExist,
  existUserById,
} = require("../helpers/db-validators");

const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usersGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existUserById),
    check("role").custom(isRole),
    validateInputs,
  ],
  usersPut
);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    check(
      "password",
      "La contraseña es obligatoria y mas de 6 letras."
    ).isLength({ min: 6 }),
    check("email").custom(emailExist),
    check("role").custom(isRole),
    validateInputs,
  ],
  usersPost
);

router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existUserById),
    validateInputs,
  ],
  usersDelete
);

router.patch("/", usersPatch);

module.exports = router;
