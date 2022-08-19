const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const usersGet = (req = request, res = response) => {
  const { q, nombre = "No name", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "get API - controlador",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usersPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // validate email
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    return res.status(400).json({
      msg: "Ese correo ya esta registrado.",
    });
  }

  //crypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  await user.save();

  res.json({
    user,
  });
};

const usersPut = (req, res = response) => {
  const { id } = req.params;

  res.json({
    msg: "put API - usersPut",
    id,
  });
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usersPatch",
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    msg: "delete API - usersDelete",
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
