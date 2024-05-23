```
.
│
├── controllers
│       └── userController.js
├── models
│       └── userModel.js
├── public
│       └── styles.css
├── views
│   ├── custom.ejs
│   ├── home.ejs
│   ├── index.ejs
│   └── login.ejs
│   └── random.ejs
│   └── register.ejs
├── database.sqlite
├── index.js
└── package.json
```

```properties
$ npm init -y
$ npm i --save-dev nodemon
$ npm i express
$ npm i ejs
$ npm i sqlite3
$ npm i express-session
$ npm i bcryptjs --save
$ npm i canvas
```
### index.js 
```javascript
```
### userController.js
```javascript
const User=require('/Models/userModel');
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
            User.createUser(username,email,hashedPassword,(err, userId)=>{
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
        User.getUserByUsername(username,(err,user)=>{
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
        req.session.destroy((errr)=>{
            if(err){
                res.status(500).send(err.message);
                return;
            }
            res.redirect('/login');
        });
}
```

### userModel.js
```javascript
const sqlite3=require('sqlite3').verbose();
const db=new sqlite3.Database('database.sqlite');

modeule.exports={
    createUser:(username,email,password,callback)=>{
        db.run('INSERT INTO users(username, email, password) VALUES (?,?,?)',
        [username,email,password],
        function(err){
            if(err){
                callback(err);
                return;
            }
            callback(null, this.lastID);
        });
    },
    getUserbyUsername:(username,callback)=>{
        db.get('SELECT id,username, email, password FROM users WHERE username=?',
        [username],
        (err,row)=>{
            if(err){
                callback(err);
                return;
            }
            callback(null,row);
        });
    },
    getUserbyId:(email,callback)=>{
        db.get('SELECT id,username, email, password FROM users WHERE email=?',
        [email],
        (err,row)=>{
            if(err){
                callback(err,null);
                return;
            }
            callback(null,row);
        });
    },
    getUserbyId:(id,callback)=>{
        db.get('SELECT id,username, email, password FROM users WHERE id=?',
        [id],
        (err,row)=>{
            if(err){
                callback(err,null);
                return;
            }
            callback(null,row);
        });
    }
}

```

### home.ejs
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Your Character Customizer!!</h1>
        </div>
        <div class="navbar">
            <ul>
                <li><a href="/home">Home</a></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <li><a href="/random">Randomize</a></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <li><a href="/custom">Customize</a></li> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <li><a href="/logout">Logout</a></li>
            </ul>
        </div>
        <div class="main-content">
             <h2>Customize your Character</h2><br>
             <p>Unleash your creativity and design your ultimate character to match your unique style!</p>
             <a href="/custom" class="btn">Customize Now</a>
             <h2>Randomize your Character</h2><br>
             <p>Feeling adventurous? Let us surprise you with a randomly generated character!</p>
             <a href="/random" class="btn">Randomize Now</a>
        </div>
    </div>
</body>
</html>
```

### index.ejs
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recipe Sharing Platform</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body><center>
    
    <div class="container" align="center">
        <h1>Welcome to Recipe Sharing Platform</h1><br><br>
    <img src="data:image/jpeg;base64,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"
    <br><br><br></center><center>
        
    <a href="/register"> <button class="btn btn-success"> Register </button></a> <br> <br><a href="/login"> <button class="btn btn-success"> Login </button></br><a>   </center>
</a>
</body>
</html>
```

### login.ejs
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body><CENTER>
    
    <div class="container">
    <h1>LOGIN</h1><br>

    <form action="/login" method="post">
        <label name="username">Username</label><br>
        <input type="text" name="username" placeholder="Username" required><br><br>

        <label name="password">Password</label><br>
        <input type="password" name="password" placeholder="Password" required><br><br>
        <button type="submit" class="btn btn-success">Login</button>
    </form></CENTER>
</div>
</body>
</html>
```

### register.ejs
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body><center>
    <div class="container">
    <h1>REGISTER</h1><br>
    <form class="register" action="/register" method="post">
        <label name="username">Username</label><br>
        <input type="text" name="username" placeholder="Username" required><br><br>
        <label name="email">Email</label><br>
        <input type="email" name="email" placeholder="Email" required><br><br>
        <label name="password">Password</label><br>
        
        <input type="password" name="password" placeholder="Password" required><br><br>
        <button type="submit" class="btn btn-success">Register</button>
    </form>
    </div></center>
</body>
</html>
```
### styles.css
```css
```

### package.json replace
```json
"scripts": {
    "server": "nodemon index"
  },
```
