// const express = require('express')
// const app = express()
// const port = 3000

// const bodyParser = require ('body-parser')

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false }))


// const mongoose = require ('mongoose')
// require("dotenv").config()

// const swaggerUi = require('swagger-ui-express')
// const swaggerDocument = require('./swagger')

// const cors = require('cors')
// app.use(cors({
//    origin:'*'
//    // origin: ['http//www.section.io', 'https://www.google.com'] 
// }))
// app.use('/',express.static('files'))

// mongoose.set("strictQuery", false)
// mongoose.connect(
//     process.env.MONGODB_URI,
//     {useNewUrlParser: true, useUnifiedTopology: true},
//     (err) => {
//         if (err){
//             console.log(err)
//         } else {
//             console.log("Connected to MongoDB")
//         }
//     }
// )
// const user = require("./routes/user.routes")
// const userProduct = require("./routes/user.product.routes")

// app.use('/api/userproducts', userProduct)
// app.use('/api/user', user)

// app.use(
//     '/api-docs',
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerDocument.options)
// )

// const product = require("./routes/product.routes") 
// app.use('/api/product', product)

// app.listen(port, ()=> {
//     console.log(`Server is listening in port ${port}`)
// })
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');


const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



const mongoose = require('mongoose');
require("dotenv").config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const cors = require('cors');
app.use(cors({
   origin:'*'
}));

const homeRoutes = require('./routes/index.routes'); 

app.use('/', homeRoutes);  

app.use('/',express.static('files')); 
app.use('/static', express.static(path.join(__dirname, 'routes/static')));

mongoose.set("strictQuery", false);
mongoose.connect(
    process.env.MONGODB_URI,
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if (err){
            console.log(err);
        } else {
            console.log("Connected to MongoDB");
        }
    }
);

const session = require('express-session')

app.use(session({
  secret: 'secret cookie',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}))

app.use(function(req, res, next) {
    
    const authFreeRoutes = [
      '/login.html',
      '/api-docs',
      '/api/user/findOne/',
      '/api/user/findAll',
      '/api/user/login'

    ];
    if (!req.session.user && !authFreeRoutes.includes(req.path)) {
        res.redirect('/login.html');
      } else {
        next();
      }
    });

const user = require("./routes/user.routes");
const userProduct = require("./routes/user.product.routes");
const partner = require("./routes/partner.routes");




app.use('/api/userproducts', userProduct);
app.use('/api/user', user);
app.use('/api/partner', partner);



app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument.options)
);

const product = require("./routes/product.routes");
app.use('/api/product', product);



app.listen(port, () => {
    console.log(`Server is listening in port ${port}`);
});