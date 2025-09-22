const nodemailer = require('nodemailer');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' })
        };
    }

    try {
        const { name, email, message } = JSON.parse(event.body);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'chatbotmail.1234@gmail.com',
                pass: 'iidr nszy ecdw nzpu'
            }
        });

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

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ status: 'Success', message: 'Email sent successfully!' })
        };

    } catch (error) {
        console.error("Error sending email:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ status: 'Error', message: 'Failed to send email.' })
        };
    }
};
