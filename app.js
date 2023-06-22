const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect('mongodb+srv://roklife25:HUHJTJguOMxwDKpT@rock4lifedata.silpwjf.mongodb.net/');

const contactSchema = new mongoose.Schema({
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
});

const volunteerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    file: {
      type: String,
      required: true
    },
    message: {
      type: String
    }
  });

const testKitSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    idNumber: {
      type: String,
      required: true
    },
    birthDate: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    houseNumber: {
      type: String,
      required: true
    },
    apartment: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    deliveryMethod: {
      type: String,
      required: true,
      enum: ['Post Office delivery', 'Home delivery by a volunteer']
    },
    approveInfo: {
      type: String,
      required: true
    }
  });


const donateSchema = new mongoose.Schema({
    donationFrequency: {
      type: String,
      required: true
    },
    donationAmount: {
      type: String,
    },
    customAmount: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    paymentMethod: {
      type: String,
      required: true
    }
  });


const ContactModel = mongoose.model('Contact', contactSchema);
const VolunteerModel = mongoose.model('Volunteer', volunteerSchema);
const TestKitModel = mongoose.model('TestKit', testKitSchema);
const DonateModel = mongoose.model('Donate', donateSchema);



app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.get('/volunteers', function(req, res){
    res.sendFile(__dirname + "/volunteers.html");
});

app.get('/about', function(req, res){
    res.sendFile(__dirname + "/about.html");
});

app.get('/contact', function(req, res){
    res.sendFile(__dirname + "/contact.html");
});

app.get('/check', function(req, res){
    res.sendFile(__dirname + "/check.html");
});

app.get('/donate', function(req, res){
    res.sendFile(__dirname + "/donate.html");
});

app.get('/partners', function(req, res){
    res.sendFile(__dirname + "/partners.html");
});

app.get('/requestTestKit', function(req, res){
    res.sendFile(__dirname + "/requestTestKit.html");
});



app.post('/contact', (req, res) => {
    const { fName, lName, email, message } = req.body;
    const newContact = new ContactModel({
      fName,
      lName,
      email,
      message
    });

    newContact.save();
    res.sendFile(__dirname + "/success.html");
  });


  
  //need to be fixed
  app.post('/volunteers', (req, res) => {
    const { name, email, subject, file, message } = req.body;
    const newVolunteer = new VolunteerModel({
      name,
      email,
      subject,
      file,
      message
    });
    newVolunteer.save();
    res.sendFile(__dirname + "/success.html");
  });

  
  app.post('/testkit', (req, res) => {
    const { name, idNumber, birthDate, email, phone, city, street, houseNumber, apartment, postalCode, deliveryMethod, approveInfo } = req.body;
    console.log(name, idNumber, birthDate, email, phone, city, street, houseNumber, apartment, postalCode, deliveryMethod, approveInfo);
    const newTestKit = new TestKitModel({
      name,
      idNumber,
      birthDate,
      email,
      phone,
      city,
      street,
      houseNumber,
      apartment,
      postalCode,
      deliveryMethod,
      approveInfo
    });

    newTestKit.save();
    res.sendFile(__dirname + "/success.html");

  });

  
  //need to be fixed
  app.post('/donate', (req, res) => {
    const {
        DonationFrequency,
        flexRadioDefault,
        customAmount,
        'donation-name': donationName,
        'donation-email': donationEmail,
        DonationPayment
      } = req.body;
    
      // Determine the donation amount based on the selected option or the custom amount
      let donationAmount;
      if (flexRadioDefault === 'custom') {
        donationAmount = customAmount;
      } else {
        donationAmount = req.body[flexRadioDefault];
      }
    
      // Create a new donation object
      const newDonation = new DonateModel({
        donationFrequency: DonationFrequency,
        donationAmount: donationAmount,
        customAmount: (flexRadioDefault === 'custom') ? donationAmount : undefined,
        name: donationName,
        email: donationEmail,
        paymentMethod: DonationPayment
      });
    
      newDonation.save();
      res.sendFile(__dirname + "/success.html");
  });






const port = process.env.PORT || 3000;
app.listen(port, function (){
    console.log('Server has started successfully on port: ' + port.toString()); 
});
