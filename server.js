
// A. Require the necessary modules
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

// B. Initialize the Express application
const app = express();
const port = 3000;

// C. Middleware to handle CORS and JSON data
app.use(cors());
app.use(express.json());

// D. Configure the email transport using Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like 'Outlook365', etc.
    auth: {
        user: 'chatbotmail.1234@gmail.com', // Replace with your email address
        pass: 'iidr nszy ecdw nzpu'    // Replace with a Gmail App Password for security
    }
});

// E. Define the POST endpoint to handle form submissions
app.post('/send-email', (req, res) => {
    // 1. Destructure the form data from the request body
    const { name, email, message } = req.body;

    // 2. Define the email content
    const mailOptions = {
        from: 'chatbotmail.1234@gmail.com', // Sender address (should be the same as your auth user)
        to: 'official.sheersh@gmail.com', // The recipient email address
        subject: `New Contact Form Submission from ${name}`,
        html: `
            <h2 style="color: #333;">New Message from Contact Form</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <p style="font-size: 12px; color: #777;">Submitted at: ${new Date().toLocaleString()}</p>
        `
    };

    // 3. Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ status: 'Error', message: 'Failed to send email.' });
        } else {
            console.log('Email sent successfully:', info.response);
            res.status(200).json({ status: 'Success', message: 'Email sent successfully!' });
        }
    });
});

// F. Start the server and listen for requests
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3000;

// Configure CORS to allow requests from your live-server's origin
// Replace 'http://127.0.0.1:8080' with the actual URL live-server is running on if it's different.
app.use(cors({
    origin: 'http://127.0.0.1:8080'
}));
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:  {
        user: 'chatbotmail.1234@gmail.com', // Replace with your email address
        pass: 'iidr nszy ecdw nzpu'    // Replace with a Gmail App Password for security
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: 'chatbotmail.1234@gmail.com',
        to: 'official.sheersh@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        html: `
            <h2 style="color: #333;">New Message from Contact Form</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <p style="font-size: 12px; color: #777;">Submitted at: ${new Date().toLocaleString()}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ status: 'Error', message: 'Failed to send email.' });
        } else {
            console.log('Email sent successfully:', info.response);
            res.status(200).json({ status: 'Success', message: 'Email sent successfully!' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
