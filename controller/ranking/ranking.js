const express = require('express');


const User = require("../../model/user");
const isAuth = require('../Auth/auth');


const route = express.Router();


 
 route.use("/ranking",isAuth, (req, res, next)=>{

    // TODO:  get all user and problem solving list ... with ranking ... DATA show 
    User.getAllAscending()
    .then(([data, fieldData]) => {
  
        const page = `./Home/Rank.ejs`
      
        res.render(page , {title:"IUBAT CPC Activites",data: data, isAuth: req.session.isAuth, userID: req.session.userID});
      
    })
    .catch((err) => {
      console.log(err);
    });
  
}); 


module.exports = route;