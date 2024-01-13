const { Schema, model } = require("mongoose");

const AllMenuSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    recipe: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { collection: "menu" }
);

const Menu = model("menu", AllMenuSchema);

module.exports = Menu;
