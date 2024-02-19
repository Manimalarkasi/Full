const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
// app.set('view engine','ejs');
app.use(bodyparser.json());
app.use(express.static('public'));
app.use(bodyparser.urlencoded({
    extended:true,
}))


mongoose.connect('mongodb://localhost:27017/Employee')
var db = mongoose.connection
db.on('error',()=>{console.log('error in connecting db')});
db.once('open',()=>{console.log('connected to db')});
const empShema = new mongoose.Schema({
    name:String,
    empid:String,
    mail:String,
    password:String,
    cpassword:String,
    phoneno:Number,
})

const Emplo = mongoose.model('Emplo',empShema);
app.post('/regi',async(req,res)=>{
    let emplo = new Emplo();
    emplo.name =req.body.name
    emplo.empid =req.body.empid
    emplo.mail =req.body.mail
    emplo.password =req.body.password
    emplo.cpassword =req.body.cpassword
    emplo.phoneno =req.body.phoneno
    // emplo.name =req.body.name

 

    const doc = await emplo.save();

    console.log(doc);
    res.send('values are posted');
    // res.json(doc);


});

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       // Check if user exists
//       let user = await Emplo.findOne({ email });
//       if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
  
//       // Check password
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
  
//       // Create and send JWT token
//       const payload = { user: { id: user.id } };
//       jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   });

app.post('/login', async (req, res) => {
  const {mail , password } = req.body;

  try {
    const user = await Emplo.findOne({ mail, password });
    if (user) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


app.get('/demo',async(req,res)=>{
    res.set({
        'Allow-acces-Allow-Origin':'*'
    });
    const doc =await Regi.find({})
    res.json(doc);
    
});

app.listen(port,()=>{
    console.log(`server is running at port on ${port}`);
});
// app.listen(8000, ()=>{
//         console.log("server is running at port on ");
//     });
