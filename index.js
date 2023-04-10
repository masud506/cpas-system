const http = require('http');
const path = require('path');  
const express = require('express');
const bodyParser = require('body-parser');


const sessionInt = require('./db/AuthSession');

const app = express();

app.set('view engine', 'ejs');  // EJS engine 

app.use(bodyParser.urlencoded({extended: false}));

app.use('/static',express.static(__dirname + '/static'));  // public static file


// Route different folder wise partitioning

// User Side
const problem = require('./controller/problem/problem'); 
const home = require('./controller/home/home'); 
const member = require('./controller/member/member');
const ranking = require('./controller/ranking/ranking');
const notice = require('./controller/notice/notice');
const user = require('./controller/user/user');

// Auth session initialized

// Admin Side
const admin = require('./controller/admin/admin'); 
const adminProblem = require('./controller/problem/adminProblem');
const adminSenior = require('./controller/member/adminSeniors');
const adminCurrentMember = require('./controller/member/adminCurrentMemeber');
const adminInstructor = require('./controller/instructor/instructor');




// Auth session initialized
app.use(sessionInt());

// route folder route located here

app.use(user);
app.use(member);
app.use(ranking);
app.use(notice);
app.use(problem);
app.use(admin);
app.use(adminProblem);
app.use(adminSenior);
app.use(adminCurrentMember);
app.use(adminInstructor);
app.use(home);


app.use((req, res)=>{
    res.send("Home Page Here");
});




const server = http.createServer(app);

server.listen(3000);