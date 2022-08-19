const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Base de datos conectado.");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de conectar a la base de datos.");
  }
};

module.exports = {
  dbConnection,
};
