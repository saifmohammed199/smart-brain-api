const express = require('express');
const bodyParser = require('body-parser')
var bcrypt = require('bcryptjs')

const app = express();
app.use(bodyParser.json());
const database ={
    users:[
        {
            id:'123',
            name:'saif',
            email:'saif@mail.com',
            entries:'0',
            joined : new Date()
        },
        {
            id:'124',
            name:'shahazaad',
            email:'shahazaad@mail.com',
            entries:'0',
            joined : new Date()
        }
    ],
    login:[
        {
            id:'987',
            hash:'',
            email:'saif@mail.com'
        }
    ]
}

app.get('/',(req,res)=>{
    res.send(database.users);
})

app.post('/signin',(req,res)=>{
    // Load hash from your password DB.
bcrypt.compare("man123", '$2a$10$PtbJhbNxAic4YQszciD55esOl.qf/snlxf/tN05RjH1qnCN04zNkW', function(err, res) {
    // res === true
    console.log('first',res)
});
bcrypt.compare("not_bacon", '$2a$10$PtbJhbNxAic4YQszciD55esOl.qf/snlxf/tN05RjH1qnCN04zNkW', function(err, res) {
    // res === false
    console.log('second',res)
});
    if (req.body.email===database.users[0].email &&
        req.body.password===database.users[0].password){
            res.json('sucess')
        }else{
            res.status(400).json('error logging in')
        }})
app.post('/register',(req,res)=>{
    const {email,password,name}=req.body;
    
    database.users.push({
            id:'125',
            name:name,
            email:email,
            password:password,
            entries:'0',
            joined : new Date()
    })
    res.json(database.users[database.users.length-1])
})
app.get('/profile/:id',(req,res)=>{
    const {id} = req.params;
    let found = false;
    database.users.forEach(user =>{
        if (user.id===id){
            found=true
           return res.json(user)
        }
    })
    if (!found){
        res.status(404).json('no such user')
    }
})
app.get('/image',(req,res)=>{
    const {id} = req.body;
    let found = false;
    database.users.forEach(user =>{
        if (user.id===id){
            found=true
            user.entries++
           return res.json(user.entries)
        }
    })
    if (!found){
        res.status(404).json('no such user')
    }
})
/*
bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            console.log(hash)
            // Store hash in your password DB.
        });
    });
*/

app.listen(3000,()=>{
    console.log('app is runnig on port 3000')
})