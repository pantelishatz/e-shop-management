const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    product: {
      type: String,
      required: [true, 'Product name is a required field'],
      max: 100,
      unique: true,
      trim: true,
      lowercase: true
    },
    cost: {
      type: Number,
      required: [true, 'Cost is a required field'],
      min: [0, 'Cost should be greater than or equal to 0']
    },
    description: {
      type: String,
      required: [true, 'Description is a required field'],
      max: 1000,
      trim: true
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is a required field'],
      min: [0, 'Quantity should be greater than or equal to 0']
    },
  },
  {
    collection: 'products',
    timestamps: true
  }
);

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', productSchema);