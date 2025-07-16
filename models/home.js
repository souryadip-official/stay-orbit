const { mongoose } = require("mongoose");
const homeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  homename: {
    type: String,
    required: true,
  },
  contactdetails: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  ac_service: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2020/05/25/13/41/chalet-5218666_1280.png",
    required: false,
  },
});

module.exports = mongoose.model("Home", homeSchema);
