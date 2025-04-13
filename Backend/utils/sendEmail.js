const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a test SMTP transporter object for development
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    auth: {
      user: process.env.SMTP_EMAIL || 'example@ethereal.email',
      pass: process.env.SMTP_PASSWORD || 'password'
    }
  });

  // Send mail with defined transport object
  const message = {
    from: `${process.env.FROM_NAME || 'Impatient Pink'} <${process.env.FROM_EMAIL || 'noreply@impatientpink.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail; 