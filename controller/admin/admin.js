const express = require('express');
const auth = require('../Auth/auth');

//const User = require('../../model/User');

const route = express.Router();


 
 route.use("/admin",auth.isAuthAdmin, (req, res, next)=>{

    const page = `./Admin/admin.ejs`
    res.render(page , {title:"IUBAT CPAS Admin"});
}); 

module.exports = route;