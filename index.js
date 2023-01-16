const nodemailer = require("nodemailer");
const parseArgs = require("minimist");

var argv = parseArgs(process.argv.slice(2), {
  string: 'username', string: 'u',
  string: 'password', string: 'p',
  string: 'to', string: 't'
});

if ((!argv.username && !argv.u) || (!argv.password && !argv.p) || (!argv.to && !argv.t)) {
    console.log(argv);
    process.exit(81); // Invalid argument ind
}
var username = argv.username || argv.u;
var password = argv.password || argv.p;
var to = argv.to || argv.t;
//var username = argv.username;
//var password = argv.password;
//var to = argv.to;

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // your SMTP host
//  host: "smtp-mail.outlook.com", // your SMTP host
  port: 587, // your SMTP port
  secure: false, // use SSL
  auth: {
    user: username, // your SMTP username
    pass: password // your SMTP password
  }
});

const mailOptions = {
  from: username, // sender address
  to: to, // list of receivers
  subject: "Hello", // Subject line
  text: "Hello world", // plain text body
  html: "<b>Hello world</b>" // html body
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Email sent: ${info.response}`);
  }
});