const mongoose = require("mongoose");

const db = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://mern:mern@cluster0.lrazuea.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database connected..");
  } catch (e) {
    console.log(e);
  }
};

module.exports = db;
