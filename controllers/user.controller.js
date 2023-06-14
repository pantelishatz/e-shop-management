const User = require('../models/user.model')

const logger = require('../logger/logger')


exports.findAll = function(req, res)  {
    console.log("find all users")

    User.find({}, (err, results) => {
        if (err) {
            res.status(400).json({status: false, data: err})
            logger.error("Error in reading all users", err)
            console.log('Problem in reading users', err)
        } else {
            res.status(200).json({status: true, data: results})
            console.log('Success in reading users')
            logger.info("Success in reading all users", results)
            logger.warn("Warn in reading all users")
            logger.error("Error in reading all users")
            logger.debug("Debug in reading all users")
        }
    })
}
exports.login = function(req, res) {
    const { username, password } = req.body;

    console.log("User login with username", username);

    User.findOne({ username: username, password: password }, (err, result) => {
        if (err) {
            res.status(400).json({ status: false, data: err });
            console.log(`Problem in login user with username ${username}`, err);
        } else {
            if (result) {
                req.session.user = result;
                res.status(200).json({ status: true, data: result });
                console.log('Success in login user', username);
            } else {
                res.status(400).json({ status: false, data: 'Invalid username or password' });
                console.log('Invalid username or password');
            }
        }
    });
};

exports.findOne = function(req, res) {
    const { username, password } = req.body;

    console.log("Find user with username", username);

User.findOne({ username: username, password: password }, (err, result) => {
    if (err) {
        res.status(400).json({ status: false, data: err });
        console.log(`Problem in finding user with username ${username}`, err);
    } else {
        if (result) {
            res.status(200).json({ status: true, data: result });
            console.log('Success in finding user', username);
        } else {
            res.status(400).json({ status: false, data: 'Invalid username or password' });
            console.log('Invalid username or password');
        }
    }
});
}

exports.create = function (req, res) {
    const newUser = new User ({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        // products: req.body.products
    })

    console.log('Insert user with username', req.body.username)

    newUser.save((err, result) =>{
        if (err) {
            res.status(400).json({status: false, data: err})
                console.log(`Problem in creating user`, err)
        } else {
            res.status(200).json({status: true, data: result})
            console.log('Success in creating user')
    }
    })} 
    
    exports.update = function (req, res) {
        let username = req.params.username;
        let update = req.body;
        User.findOneAndUpdate({username: username}, update, {new: true})
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "User not found with username " + username
                    });
                }
                res.send({status: true, data: user});
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with username " + username
                    });
                }
                return res.status(500).send({
                    message: "Error updating user with username " + username
                });
            });
    }

exports.delete = function(req, res) {
    const username = req.params.username

    console.log("Delete user", username)

    User.findOneAndDelete({ username: username}, (err, result)=>{
        if (err) {
          res.status(400).json({ status: false, data: err});
          console.log(`Problem in deleting user`, err);
        } else {
          res.status(200).json({ status: true, data: result});
          console.log('Success in deleting user'); 
        }
      })
}
