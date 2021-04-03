const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  role: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
  birthday: {
    type: String,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
  },
  street: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  zipCode: {
    type: Number,
  },
  city: {
    type: String,
  },
  userImage: {
    type: String,
  },
});
module.exports = User = mongoose.model("user", userSchema);
