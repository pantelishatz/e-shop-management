// const express = require('express');
// const router = express.Router();

// // Home route
// router.get('/', (req, res) => {
//   res.send('<h1>Welcome to my e-shop</h1>');
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './static/login.html'));
});

module.exports = router;