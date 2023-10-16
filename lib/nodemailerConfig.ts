import nodemailer from 'nodemailer';


export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:'licenseappointmant@gmail.com',
      pass: 'mfgxreslwfjljabf',
    },
  });