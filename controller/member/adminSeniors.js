const express = require('express');
const multer = require('multer');
const fs = require('fs');

const Seniors = require('../../model/seniors');

//const User = require('../../model/User');

const route = express.Router();

const fileStorageEngine = multer.diskStorage({
    destination: (req, res, cb)=>{
        cb(null, "./static/img");
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
});


const upload = multer({storage : fileStorageEngine });




 route.use("/adminSeniorMember", (req, res, next)=>{

     
    Seniors.getAll()
    .then(([data, fieldData]) => {
      //console.log(data);

      const page = `./Admin/member/senior/adminSenior.ejs`
      
      res.render(page , {title:"IUBAT Senior Members",  data: data});
      
    })
    .catch((err) => {
      console.log(err);
    });

}); 

 
route.use("/adminSeniorCreate", (req, res, next)=>{

    const page = `./Admin/member/senior/create.ejs`
    res.render(page , {title:"IUBAT Senior Members"});
}); 

route.use("/adminSeniorCreatePost", upload.single('picture'), (req, res, next)=>{

    console.log(req.file);

    let savedata = ()=>{
        
    let image = req.file.path;
    let name = req.body.name;
    let email = req.body.email;
    let jobStatus = req.body.jobStatus;

   

    const senior = new Senior(null, name, jobStatus, image, email);
   
    senior.save()
      .then(()=>{
         
          res.redirect('/adminSeniorMember');
      })
      .catch(err =>{
        console.error(err);
      });

    }

    savedata();

}); 

module.exports = route;