const Product = require('../models/product.model')

exports.findAll = function(req, res)  {
    console.log("find all products")

    Product.find({}, (err, results) => {
        if (err) {
            res.status(400).json({status: false, data: err})
            console.log('Problem in reading products', err)
        } else {
            res.status(200).json({status: true, data: results})
            console.log('Success in reading products')
        }
    })
}

exports.findOne = function(req, res) {

    const product = req.params.product

    console.log("Find product with name", product)
    
    Product.findOne({product: product}, (err, result) => {
        if (err) {
            res.status(400).json({status: false, data: err})
            console.log(`Problem in finding product with name ${product}`)
        } else {
            res.status(200).json({status: true, data: result})
            console.log('Success in finding product with name', product)
        }
    })
}

exports.create = function (req, res) {
    const newProduct = new Product ({
      product: req.body.product,
      cost: req.body.cost,
      description: req.body.description,
      quantity: req.body.quantity,
    })
  
    console.log('Insert product with name', req.body.product)
  
    newProduct.save((err, result) =>{
      if (err) {
        res.status(400).json({status: false, data: err})
        console.log(`Problem in creating product`, err)
      } else {
        res.status(200).json({status: true, data: result})
        console.log('Success in creating product')
      }
    })
  }

exports.update = function(req, res) {
    const product = req.body.product;

    const updateProduct = {
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity,
    };

    Product.findOneAndUpdate({product: product}, {$set: updateProduct}, {new:true}, (err, result) => {
        if (err) {
            res.status(400).json({status: false, data: err})
            console.log(`Problem in updating product`, err)
        } else {
            res.status(200).json({status: true, data: result})
            console.log('Success in updating product')
        }
    })
};

exports.delete = function(req, res) {
    const product = req.params.product;

    console.log("Delete product", product);

    Product.findOneAndDelete({ product: product }, (err, result) => {
        if (err) {
            res.status(400).json({ status: false, data: err });
            console.log(`Problem in deleting product`, err);
        } else {
            res.status(200).json({ status: true, data: result });
            console.log('Success in deleting product');
        }
    });
}