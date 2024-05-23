const User=require('../Models/userModel');
const bcrypt=require('bcryptjs');

module.exports={
    registerForm: (req,res)=>{
        res.render('register');
    },
    register: (req,res)=>{
        const{username, email, password}=req.body;
        bcrypt.hash(password,10,(err,hashedpassword)=>{
            if(err){
                res.status(500).send(err.message);
                return;
            }
            User.createUser(username,email,hashedpassword,(err, userId)=>{
                if(err){
                    res.status(500).send(err.message);
                    return;
                }
                res.redirect('/login');
            });
        });
    },
    loginForm:(req,res)=>{
        res.render('login');
    },
    login:(req,res)=>{
        const{username,password}=req.body;
        User.getUserbyUsername(username,(err,user)=>{
            if(err){
                res.status(500).send(err.message);
                return;
            }
            if(!user){
                res.status(404).send('User not found');
                return;
            }
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    res.status(500).send(err.message);
                    return;
                }
                if(result){
                    req.session.userId=user.id;
                    res.redirect('/home');
                }else{
                    res.status(401).send('Invalid password');
                    return;
                }
            });
        });
    },
    logout:(req,res)=>{
        req.session.destroy((err)=>{
            if(err){
                res.status(500).send(err.message);
                return;
            }
            res.redirect('/login');
        });
    }
}