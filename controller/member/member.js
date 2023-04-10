const express = require('express');


const Seniors = require('../../model/seniors');
const CurrentMember = require('../../model/currentMember');


const route = express.Router();


 
 route.use("/seniors", (req, res, next)=>{
    
    Seniors.getAll()
    .then(([data, fieldData]) => {
      //console.log(data);

      const page = `./Home/SeniorsProfile.ejs`
      
      res.render(page , {title:"IUBAT CPC Seniors",  data: data, isAuth: req.session.isAuth});
      
    })
    .catch((err) => {
      console.log(err);
    });


   
   
}); 

route.use("/member", (req, res, next)=>{
    
  CurrentMember.getAll()
  .then(([data, fieldData]) => {
    //console.log(data);

    const page = `./Home/CurrentMember.ejs`
    
    res.render(page , {title:"IUBAT CPC Seniors",  data: data, isAuth: req.session.isAuth});
    
  })
  .catch((err) => {
    console.log(err);
  });


}); 


module.exports = route;