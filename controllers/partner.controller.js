const Partner = require('../models/partner.model');

exports.findAll = function(req, res) {
    console.log("Find all partners");

    Partner.find({}, (err, results) => {
        if (err) {
            res.status(400).json({ status: false, data: err });
            console.log('Problem in reading partners', err);
        } else {
            res.status(200).json({ status: true, data: results });
            console.log('Success in reading partners');
        }
    });
};

exports.findOne = function(req, res) {
    const partner = req.params.partner;

    console.log("Find partner with name", partner);

    Partner.findOne({ partner: partner }, (err, result) => {
        if (err) {
            res.status(400).json({ status: false, data: err });
            console.log(`Problem in finding partner with name ${partner}`);
        } else {
            res.status(200).json({ status: true, data: result });
            console.log('Success in finding partner with name', partner);
        }
    });
};

exports.create = function(req, res) {
    const newPartner = new Partner({
        name: req.body.name,
        surname: req.body.surname,
        address: req.body.address,
        phone: req.body.phone,
        role: req.body.role
    });

    Partner.findOne({ surname: req.body.surname }, (err, existingPartner) => {
        if (err) {
            res.status(500).json({ status: false, data: err });
            console.log(`Error in checking partner uniqueness`, err);
            return;
        }

        if (existingPartner) {
            res.status(400).json({ status: false, message: "A partner with the same surname already exists." });
            console.log(`Partner with the same surname already exists`);
            return;
        }

        newPartner.save((err, result) => {
            if (err) {
                res.status(400).json({ status: false, data: err });
                console.log(`Problem in creating partner`, err);
            } else {
                res.status(200).json({ status: true, data: result });
                console.log('Success in creating partner');
            }
        });
    });
};

exports.update = function(req, res) {
    const surname = req.params.surname;
    const updatePartner = {
        address: req.body.address,
        phone: req.body.phone,
        role: req.body.role
    };
    Partner.findOneAndUpdate({ surname: surname }, updatePartner, { new: true })
        .then(partner => {
            if (!partner) {
                return res.status(404).send({
                    message: "Partner not found with surname " + surname
                });
            }
            res.send({ status: true, data: partner });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Partner not found with surname " + surname
                });
            }
            return res.status(500).send({
                message: "Error updating partner with surname " + surname
            });
        });
};

exports.delete = function(req, res) {
    const surname = req.params.surname;

    console.log("Delete partner", surname);

    Partner.findOneAndDelete({ surname: surname }, (err, result) => {
        if (err) {
            res.status(400).json({ status: false, data: err });
            console.log(`Problem in deleting partner`, err);
        } else {
            res.status(200).json({ status: true, data: result });
            console.log('Success in deleting partner');
        }
    });
};