const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use other services such as Outlook, Yahoo, etc.
  auth: {
    user: 'afs3dprints@gmail.com', // Replace with your email
    pass: 'afs3dprints' // Replace with your email password
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'recipient-email@example.com', // Replace with the recipient's email
    subject: `Message from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
