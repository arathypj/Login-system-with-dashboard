const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "admindashboard"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));



app.get('/get', (req, res) => {
    console.log("work");

    const sqlSelect = "SELECT * FROM userdetailstable";
    console.log("work");
    db.query(sqlSelect, (err, result)=>{
        res.send(result);
    
    });
    
});

app.post('/login', (req, res)=>{

    const loginusername = req.body.loginusername;
    const loginpassword = req.body.loginpassword;

    res.send(loginusername);
});

app.post('/insert', (req, res)=>{

    const fullname = req.body.fullname;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;
    const photo = req.body.photo;

    console.log("result123");

    const sqlQuery = "INSERT INTO userdetailstable (Fullname, Email, Phonenumber, Photo) VALUES(?,?,?,?)";
    db.query(sqlQuery, [fullname, email, phonenumber, photo],(err, result)=>{
    console.log(result);
    });
});

app.put('/update', (req, res)=>{

    const fullname = req.body.fullname;
    const email = req.body.email;
    const newnumber = req.body.phonenumber;

    console.log("result");

    const sqlQuery = "UPDATE userdetailstable SET Phonenumber = ? WHERE fullname = ? AND email = ?";
    db.query(sqlQuery, [newnumber, fullname, email],(err, result)=>{
    console.log(err);
    });
});

app.delete("/delete/:fullname&&:email&&:phonenumber",(req,res)=>{
    const deleteName = req.params.fullname;
    const deleteEmail = req.params.email;
    const deleteNumber = req.params.phonenumber;
    
    const sqlDelete = "DELETE FROM userdetailstable WHERE Fullname = ? AND Email = ?";
    db.query(sqlDelete, [deleteName, deleteEmail], (err, result)=>{
        console.log(deleteNumber);
        
    });
});



app.listen(3001, () => {
    console.log("running on port 3001");
});