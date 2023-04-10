const express = require('express');
const path = require('path');



const route = express.Router();


 
 route.use("/", (req, res, next)=>{
    //res.sendFile(path.join(__dirname, '../..',  'views/Home', 'index.html'));
    console.log(req.session.userID);
    const page = `./Home/index.ejs`
    res.render(page , {title:"IUBAT CPC", isAuth: req.session.isAuth, isAdmin: req.session.userID == 12});
}); 

module.exports = route;