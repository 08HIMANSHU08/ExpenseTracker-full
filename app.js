
const path = require('path');

const express = require('express');
const fs = require('fs');

require('dotenv').config();
 
const bodyParser = require('body-parser');
const sequelize=require('./util/database');
const helmet = require('helmet');
const morgan = require('morgan');

var cors = require('cors');

const SignUp = require('./models/signup');
const Expense = require('./models/expensetable');
const ForgotPassward = require('./models/forgetpasswardrequest');
const urlModels = require('./models/urltable');

const errorController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const expenseRoutes = require('./routes/expenseapp');
const purchaseRoutes = require('./routes/purchase');
const premiumFeatureRoutes = require('./routes/premiumfeature');
const passwardRoutes = require('./routes/forgotpassward');

const Order = require('./models/order');
const app = express();

app.use(cors());

app.set('view engine','ejs')
app.set('views','views')

app.use(bodyParser.json({extended:false}));

app.use(express.static(path.join(__dirname,'public')));

const accessLogStream = fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {flags:'a'}
);

app.use(helmet());
app.use(morgan('combined',{stream:accessLogStream}));



app.use('/user',adminRoutes)


app.use('/expense',expenseRoutes);

app.use('/purchase',purchaseRoutes);

app.use('/premium',premiumFeatureRoutes);

app.use('/password',passwardRoutes);

app.use(errorController.get404)


// app.use((req,res)=>{
//     // console.log(req.url);
//     res.sendFile(path.join(__dirname,`public/${req.url}`));
// })

SignUp.hasMany(Expense);
Expense.belongsTo(SignUp);

SignUp.hasMany(Order);
Order.belongsTo(SignUp);

SignUp.hasMany(ForgotPassward);
ForgotPassward.belongsTo(SignUp);

SignUp.hasMany(urlModels);
urlModels.belongsTo(SignUp);

sequelize.sync()
.then(result=>{
    // console.log(process.env.PORT)
    app.listen(process.env.PORT)
})
.catch(err=>{console.log(err)});
