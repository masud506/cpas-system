const express = require('express');


const User = require('../../model/user');



const route = express.Router();


 
 route.use("/adminInstructor", (req, res, next)=>{
    
    User.getAll()
    .then(([data, fieldData]) => {
      //console.log(data);

      const page = `./Admin/instructor/adminInstructor.ejs`
      
      res.render(page , {title:"Instructor page to analysis to user", Link : "/userPerformance/",  data: data});
      
    })
    .catch((err) => {
      console.log(err);
    });
   
}); 

route.use("/userPerformance/:id", (req, res)=>{

    let id = req.params.id;

    User.findById(id)
    .then(([data, fieldData]) => {
      //console.log(data);

      const page = `./Admin/instructor/eachUserPerformance.ejs`
      console.log(data[0]);
      res.render(page , {title:"User Performance", data: data[0]});
      
    })
    .catch((err) => {
      console.log(err);
    });
});



module.exports = route;