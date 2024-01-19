const express = require('express');
const mongoose = require("mongoose");

const connectdb = async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://anandjethava538:Anand123@cluster0.ujbaulb.mongodb.net/Eco");
      console.log("MongoDB Connected");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
    }
  };
connectdb();
app = express()

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Import routes from other files (get, post, put, delete)

app.get('/', function(req, res) {
    res.render('index');
})

const feedbackSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

app.post('/feedback', async (req, res) => {
    const feedback_form = new Feedback ({
        name : req.body.name,
        email : req.body.email,
        message : req.body.message,
        
    });

    await feedback_form.save();
    res.redirect('/')
})

app.listen(8080);
console.log("Server is running on port 8080");