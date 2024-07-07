import nodemailer from 'nodemailer';

let otpData; // Mock data for storing OTPs temporarily

export const sendOTP = (req, res) => {
  const { email } = req.body;
  if (email) {
    const randomOTP = Math.floor(1000 + Math.random() * 9000);
    console.log('Generated OTP:', randomOTP);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP for SignUp',
      text: `Your OTP is: ${randomOTP}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending OTP.');
      } else {
        console.log('Email sent:', info.response);
        otpData = randomOTP;
        res.status(200).json({ message: 'OTP sent successfully.' });
      }
    });
  } else {
    res.status(400).send('Invalid request.');
  }
};

export const verifyOTP = (req, res) => {
  const { email, otp } = req.body;
  if (email && otp) {
    if (otp == otpData) {
      res.status(200).send('OTP verified successfully');
    } else {
      res.status(400).send('Invalid OTP');
    }
  } else {
    res.status(400).send('Invalid request.');
  }
};
