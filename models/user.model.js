const mongoose = require('mongoose')
const uniqueValidator = require ('mongoose-unique-validator')

const Schema = mongoose.Schema
const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return re.test(email)
}

let productSchema = new Schema({
    product: {type: String},
    cost: {type: Number},
    quantity: {type: Number},
    date: {type: Date, default: Date.now}
},{_id: false} )

let userSchema = new Schema({
    username : {
        type: String,
        required: [true, 'Username is required field'],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true
},
    password : {
        type: String,
        required: [true, 'Password is required field'],
        max: 100,   
},
address : {
    type: String,
    max: 100,
},

phone : {
    type: String,
    max: 100,
},
    name : {
    type: String,
    max: 100,
},
    surname : {
        type : String,
        max: 100
},
    email: {
        type: String,
        required: [true, 'Email is required field'],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true,
        // validate:[validateEmail, 'Email address is not valid']
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address is not valid']
},

}, 

{
    collection: 'users',
    timestamps: true
})

  const User = mongoose.model('User', userSchema);
  
  module.exports = User;

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)