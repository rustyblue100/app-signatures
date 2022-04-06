const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employesSchema = new Schema(
  {
    preNom: {
      type: String,
      required: false,
    },
    nom: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
    },
    roleFr: {
      type: String,
      required: false,
    },
    telephone: {
      type: String,
      required: false,
    },
    linkedin: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Employes = mongoose.model("Employes", employesSchema);

module.exports = Employes;
