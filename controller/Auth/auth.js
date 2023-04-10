

const isAuth = (req, res, next) =>{
    console.log("User", req.session)
    if(req.session.isAuth)
    {
        next();
    }
    else{
         res.redirect('/login');
    }
};

const isAuthAdmin = (req, res, next) =>{
    if(req.session.isAuth && req.session.userID == 12)
    {
        next();
    }
    else{
         res.redirect('/login');
    }
};



module.exports = isAuth;
module.exports.isAuthAdmin = isAuthAdmin;