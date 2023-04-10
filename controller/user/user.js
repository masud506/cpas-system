const express = require('express');
const bcrypt = require('bcryptjs');


const User = require('../../model/User');
const isAuth = require('../Auth/auth');

const route = express.Router();


/* 
 route.use("/user", (req, res, next)=>{

    
    User.getAll().then(([data, fieldData]) =>{
       
        console.log(data);
     })
     .catch((err)=>{
         console.log(err);
       });

    res.send('<h2>Hello from User </h2>');
}); 

*/


route.get("/profile",isAuth, (req, res, next)=>{

    User.findById(req.session.userID)
    .then((userData)=>{
        console.log(userData[0][0]);
        const page = `./User/profile.ejs`
        res.render(page , {title:"Login Page", exist: "NO", data: userData[0][0], isAuth: req.session.isAuth});
        
    })
    .catch((err)=>{
        console.log(err);
    });

   
}); 

route.get("/login", (req, res, next)=>{

   

    const page = `./User/login.ejs`
    res.render(page , {title:"Login Page", exist: "NO", isAuth: req.session.isAuth});
    
}); 

route.post('/login', (req, res, next)=>{
    // login check 
    let username = req.body.name;
    let password = req.body.password;

    User.findByName(username)
        .then(async([data])=>{
           if(data.length>0){
            // user exists
            console.log(data[0].password, password);

            const isMatch = await bcrypt.compare(password, data[0].password);

            console.log(isMatch);

            if(!isMatch){
                const page = `./User/login.ejs`
               return res.render(page , {title:"Login Page", exist: "YES", isAuth: req.session.isAuth});
            }


            
            req.session.isAuth = true;
            req.session.userID =  data[0].uid;

            
           
            res.redirect('/');
            

           }
           else{
            // user does not exist
            const page = `./User/login.ejs`
           return res.render(page , {title:"Login Page", exist: "YES", isAuth: req.session.isAuth});
           }
        })
        .catch((err)=>{
            console.log(err);
        })
     
});

route.get("/register", (req, res, next)=>{



    const page = `./User/register.ejs`
    res.render(page , {title:"Register Page", exist: "NO", username:"", isAuth: req.session.isAuth});
}); 

route.post('/register', async(req, res, next)=>{
    // check regisert logic 

   let username = req.body.name;
   let password = req.body.password;

   // encrypt password
   password = await  bcrypt.hash(password, 10);
    
   console.log(typeof(password), typeof(username));
    // chek user exists or not 
    User.findByName(username)
        .then(([user]) => {
            if(user.length > 0)
            {
             // exist user 
             const page = `./User/register.ejs`
             res.render(page , {title:"Register Page", exist: "YES", username: username, isAuth: req.session.isAuth});
            }
            else
            {
               let user = new User(null, username, password, 0, 0, 0);
               user.save()
              .then((user) => {
                  // data save succssfully

                res.redirect('/login');
              })
              .catch((error) =>{
                  console.log(error);
              })
            
            }
        })
        .catch((err)=>{
            console.log(err);
        });
            // create user

   
});
route.get("/logout", (req, res, next)=>{

   req.session.destroy((err)=>{
       if(err) throw err;
      
       res.redirect('/')
   })
    
}); 


module.exports = route;