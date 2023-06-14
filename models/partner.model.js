const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let partnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      max: 100,
    },
    surname: {
      type: String,
      required: true,
      max: 100,
      unique: true
    },
    address: {
      type: String,
      max: 100,
    },
    phone: {
      type: String,
      max: 100,
    },
    role: {
      type: String,
      required: true,
      max: 100,
    },
  },
  {
    collection: 'partners',
    timestamps: true,
  }
);

partnerSchema.plugin(uniqueValidator);

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;
