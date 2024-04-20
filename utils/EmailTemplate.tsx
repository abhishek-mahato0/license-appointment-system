import { capitalizeFirstLetter, convertDate } from "./convertDate";

export const logourl = `${process.env.BASE_URL}/images/dot.png`;

export function accountConfirmationTemplate({
  token,
  userId,
  name,
}: {
  token: string;
  userId: string;
  name: string;
}) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container-big{
          width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border: 2px solid #0388f8;
        }
        .container {
            width: 550px;
            padding:10px;
        }
        .title{
          width: 590px;
          display: flex;
          gap:5px;
          padding-left: 10px;
          background-color: #0388f8;
          color: #ffffff;
        }
        .text-white{
          color: #ffffff;
        }
        .text-lg{
          font-size: 14px;
        }
        .text-xs{
          font-size: 12px;
        }
        .flex-col{
          display: flex;
          flex-direction: column;
          gap: 5px;
          font-weight: 700;
          color: #ffffff;
        }
        h1 {
            text-align: start;
            color: #ffffff;
        }
        p {
            color: #555555;
            font-size: 16px;
            line-height: 1.3;
        }
        .button {
            padding: 10px 20px;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            border: 2px solid #0388f8;
        }
        .button:hover {
            text-color: #ffffff;
            scale: 1.1;
        }
        .logo {
            width: 500px;
            height: 250px;
        }
    </style>
</head>
<body>
    <div class="container-big">
    <div class="title">
        <h1>Account Verification</h1>
    </div>
    <div class="container">
        <p>Dear ${name},</p>
        <p>Please click the button below to verify your account:</p>
        <a href="${process.env.BASE_URL}/verify/${userId}?token=${token}" class="text-white button">
        Verify Account</a>
        <p>If you did not request this verification, you can safely ignore this email.</p>
        <hr/>
        <p>Thank you,</p>
        <p>License Appointment System </p>
        <p>Department of tranport and license</p>
        <p>Government of Nepal</p>
  </div>
    </div>
</body>
</html>`;
}
export function informationConfirmationtemplate() {
  return ` <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
          }
          .container-big{
            width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 2px solid #0388f8;
          }
          .container {
              width: 550px;
              padding:10px;
          }
          .title{
            width: 590px;
            display: flex;
            gap:5px;
            padding-left: 10px;
            background-color: #0388f8;
            color: #ffffff;
          }
          .text-white{
            color: #ffffff;
          }
          .text-lg{
            font-size: 14px;
          }
          .text-xs{
            font-size: 12px;
          }
          .flex-col{
            display: flex;
            flex-direction: column;
            gap: 5px;
            font-weight: 700;
            color: #ffffff;
          }
          h2 {
              text-align: start;
              color: #ffffff;
          }
          p {
              color: #555555;
              font-size: 16px;
              line-height: 1.3;
          }
          .button {
              padding: 10px 20px;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              border: 2px solid #0388f8;
          }
          .button:hover {
              text-color: #ffffff;
              scale: 1.1;
          }
          .logo {
              width: 500px;
              height: 250px;
          }
      </style>
  </head>
  <body>
      <div class="container-big">
      <div class="title">
          <h2>Confirmation receipt of Your Information</h2>
      </div>
      <div class="container">
      <p>Dear user,</p>
      <p>We wanted to inform you that we have successfully received the information you recently submitted. Thank you for providing the required details.</p>
      <p>Your submission will now undergo a verification process. Our team will review the information provided and ensure its accuracy. We aim to complete this process promptly and will notify you of the outcome as soon as possible.</p>
      <p>If your submission is verified, you will receive confirmation along with any further instructions, if applicable. In case any discrepancies are found or additional information is required, we will reach out to you promptly to resolve the issue.</p>
          <hr/>
          <p>Thank you,</p>
          <p>License Appointment System </p>
          <p>Department of tranport and license</p>
          <p>Government of Nepal</p>
    </div>
    </div>
  </body>
  </html>
  
   `;
}

export function forgetPasswordTemplate({
  token,
  user,
}: {
  token: string;
  user: string;
}) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
          }
          .container-big{
            width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 2px solid #0388f8;
          }
          .container {
              width: 550px;
              padding:10px;
          }
          .title{
            width: 590px;
            display: flex;
            gap:5px;
            padding-left: 10px;
            background-color: #0388f8;
            color: #ffffff;
          }
          .text-white{
            color: #ffffff;
          }
          .text-lg{
            font-size: 14px;
          }
          .text-xs{
            font-size: 12px;
          }
          .flex-col{
            display: flex;
            flex-direction: column;
            gap: 5px;
            font-weight: 700;
            color: #ffffff;
          }
          h1 {
              text-align: start;
              color: #ffffff;
          }
          p {
              color: #555555;
              font-size: 16px;
              line-height: 1.3;
          }
          .button {
              padding: 10px 20px;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              border: 2px solid #0388f8;
          }
          .button:hover {
              text-color: #ffffff;
              scale: 1.1;
          }
          .logo {
              width: 500px;
              height: 250px;
          }
      </style>
  </head>
  <body>
      <div class="container-big">
      <div class="title">
      <h2>Reset Password</h2>
      </div>
      <div class="container">
      <p>Dear ${user},</p>
      <p>We received a request to reset your password. The below give is the reset token.</p>
      <h3>${token}</h3>
      <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
          <hr/>
          <p>Thank you,</p>
          <p>License Appointment System </p>
          <p>Department of tranport and license</p>
          <p>Government of Nepal</p>
    </div>
      </div>
  </body>
  </html>`;
}

export function documentStatusTemplate({
  status,
  user,
  message,
}: {
  status: string;
  user: string;
  message: string;
}) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
          }
          .container-big{
            width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 2px solid #0388f8;
          }
          .container {
              width: 550px;
              padding:10px;
          }
          .title{
            width: 590px;
            display: flex;
            gap:5px;
            padding-left: 10px;
            background-color: #0388f8;
            color: #ffffff;
          }
          .text-white{
            color: #ffffff;
          }
          .text-lg{
            font-size: 14px;
          }
          .text-xs{
            font-size: 12px;
          }
          .flex-col{
            display: flex;
            flex-direction: column;
            gap: 5px;
            font-weight: 700;
            color: #ffffff;
          }
          h1 {
              text-align: start;
              color: #ffffff;
          }
          p {
              color: #555555;
              font-size: 16px;
              line-height: 1.3;
          }
          .button {
              padding: 10px 20px;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              border: 2px solid #0388f8;
          }
          .button:hover {
              text-color: #ffffff;
              scale: 1.1;
          }
          .logo {
              width: 500px;
              height: 250px;
          }
      </style>
  </head>
  <body>
      <div class="container-big">
      <div class="title">
      <h2>Document Verification Status</h2>
      </div>
      <div class="container">
      <p>Dear ${user},</p>
      <p>We hope this email finds you well. We wanted to inform you about the status of your document.</p><br/>
      <p><strong>Status: ${status}</strong></p>
      <p><strong>Message: </strong>${message}</p><br/>
      <p>If your document status is verified, you are all set and can apply for services!</p>
      <p>If your document status is rejected, please review the message provided and resubmit your document accordingly.</p>
      <p>Thank you for your cooperation and understanding.</p>
          <hr/>
          <p>Thank you,</p>
          <p>License Appointment System </p>
          <p>Department of tranport and license</p>
          <p>Government of Nepal</p>
    </div>
      </div>
  </body>
  </html>`;
}

export function appointmentConfirmationTemplate({
  user,
  appointmentDate,
  appointments,
  location,
  trackingNumber,
  category,
}: {
  user: string;
  appointmentDate: string;
  appointments: any;
  location: string;
  trackingNumber: string;
  category: string;
}) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
          }
          .container-big{
            width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 2px solid #0388f8;
          }
          .container {
              width: 550px;
              padding:10px;
          }
          .title{
            width: 590px;
            display: flex;
            gap:5px;
            padding-left: 10px;
            background-color: #0388f8;
            color: #ffffff;
          }
          .text-white{
            color: #ffffff;
          }
          .text-lg{
            font-size: 14px;
          }
          .text-xs{
            font-size: 12px;
          }
          .flex-col{
            display: flex;
            flex-direction: column;
            gap: 5px;
            font-weight: 700;
            color: #ffffff;
          }
          h2 {
              text-align: start;
              color: #ffffff;
          }
          p {
              color: #555555;
              font-size: 16px;
              line-height: 1.3;
          }
          .button {
              padding: 10px 20px;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              border: 2px solid #0388f8;
          }
          .button:hover {
              text-color: #ffffff;
              scale: 1.1;
          }
          .logo {
              width: 500px;
              height: 250px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 2px solid #007bff;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #007bff;
            color: #ffffff;
            font-weight: bold;
          }
      </style>
  </head>
  <body>
      <div class="container-big">
      <div class="title">
          <h2>Appointment Confirmation</h2>
      </div>
      <div class="container">
      <p>Dear ${user},</p>
      <p>We are pleased to confirm your appointment for a driving license test. Please find the details below:</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
      <p><strong>Date:</strong> ${convertDate(new Date(appointmentDate))}</p>
      <p><strong>Location:</strong> ${location}</p>
      <table>
      <tr>
        <th>Examination</th>
        <th>Shift</th>
        <th>Appointment Date</th>
      </tr>
      <tr>
        <td>${appointments[0]?.name}</td>
        <td>${capitalizeFirstLetter(appointments[0]?.shift)}</td>
        <td>${appointments[0]?.date}</td>
      </tr>
      <tr>
        <td>${appointments[1]?.name}</td>
        <td>${capitalizeFirstLetter(appointments[1]?.shift)}</td>
        <td>${appointments[1]?.date}</td>
      </tr>
      <tr>
        <td>${appointments[2]?.name}</td>
        <td>${capitalizeFirstLetter(appointments[2]?.shift)}</td>
        <td>${appointments[2]?.date}</td>
      </tr>
    </table>
    
      <p>Please ensure you arrive at the test center at least 5 minutes before your scheduled time. Bring all the necessary documents and equipment required for the test.</p>
        <hr/>
          <p>Thank you,</p>
          <p>License Appointment System </p>
          <p>Department of tranport and license</p>
          <p>Government of Nepal</p>
    </div>
    </div>
  </body>
  </html>`;
}

export function individualAppointmentTemplate({
  status,
  user,
  shift,
  type,
}: {
  status: string;
  user: string;
  shift: string;
  type: string;
}) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
          }
          .container-big{
            width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 2px solid #0388f8;
          }
          .container {
              width: 550px;
              padding:10px;
          }
          .title{
            width: 590px;
            display: flex;
            gap:5px;
            padding-left: 10px;
            background-color: #0388f8;
            color: #ffffff;
          }
          .text-white{
            color: #ffffff;
          }
          .text-lg{
            font-size: 14px;
          }
          .text-xs{
            font-size: 12px;
          }
          .flex-col{
            display: flex;
            flex-direction: column;
            gap: 5px;
            font-weight: 700;
            color: #ffffff;
          }
          h1 {
              text-align: start;
              color: #ffffff;
          }
          p {
              color: #555555;
              font-size: 16px;
              line-height: 1.3;
          }
          .button {
              padding: 10px 20px;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              border: 2px solid #0388f8;
          }
          .button:hover {
              text-color: #ffffff;
              scale: 1.1;
          }
          .logo {
              width: 500px;
              height: 250px;
          }
      </style>
  </head>
  <body>
      <div class="container-big">
      <div class="title">
      <h2>Medical Examination Status</h2>
      </div>
      <div class="container">
      <p>Dear ${user},</p>
    <p>We are writing to inform you about the status of your recent ${type} examination.</p>
    <p><strong>Status: ${status}</strong></p>
    <p>If your examination status is 'Completed', your results have been reviewed and processed.</p>
    <p>If your status is 'Pending', please note that we are still in the process of reviewing your examination results. This may take some time, and we appreciate your patience.</p>
    <p>If your status is 'failed', please reschedule you appointment.</p>
          <hr/>
          <p>Thank you for your cooperation throughout this process,</p>
          <p>License Appointment System </p>
          <p>Department of tranport and license</p>
          <p>Government of Nepal</p>
    </div>
      </div>
  </body>
  </html>`;
}

export function appointmentRescheduleTemplate({
  user,
  appointmentDate,
  appointments,
  location,
  trackingNumber,
}: {
  user: string;
  appointmentDate: string;
  appointments: any;
  location: string;
  trackingNumber: string;
}) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
          }
          .container-big{
            width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 2px solid #0388f8;
          }
          .container {
              width: 550px;
              padding:10px;
          }
          .title{
            width: 590px;
            display: flex;
            gap:5px;
            padding-left: 10px;
            background-color: #0388f8;
            color: #ffffff;
          }
          .text-white{
            color: #ffffff;
          }
          .text-lg{
            font-size: 14px;
          }
          .text-xs{
            font-size: 12px;
          }
          .flex-col{
            display: flex;
            flex-direction: column;
            gap: 5px;
            font-weight: 700;
            color: #ffffff;
          }
          h2 {
              text-align: start;
              color: #ffffff;
          }
          p {
              color: #555555;
              font-size: 16px;
              line-height: 1.3;
          }
          .button {
              padding: 10px 20px;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              border: 2px solid #0388f8;
          }
          .button:hover {
              text-color: #ffffff;
              scale: 1.1;
          }
          .logo {
              width: 500px;
              height: 250px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 2px solid #007bff;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #007bff;
            color: #ffffff;
            font-weight: bold;
          }
      </style>
  </head>
  <body>
      <div class="container-big">
      <div class="title">
      <h2>Appointment Rescheduled</h2>
      </div>
      <div class="container">
      <p>Dear ${user},</p>
      <p>We are writing to inform you that your appointment has been successfully rescheduled. Please find the updated details below:</p>
      <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
      <p><strong>Date:</strong> ${convertDate(new Date(appointmentDate))}</p>
      <p><strong>Location:</strong> ${location}</p>
      <table>
      <tr>
        <th>Examination</th>
        <th>Shift</th>
        <th>Appointment Date</th>
      </tr>
      <tr>
        <td>${appointments[0]?.name}</td>
        <td>${capitalizeFirstLetter(appointments[0]?.shift)}</td>
        <td>${appointments[0]?.date}</td>
      </tr>
      <tr>
        <td>${appointments[1]?.name}</td>
        <td>${capitalizeFirstLetter(appointments[1]?.shift)}</td>
        <td>${appointments[1]?.date}</td>
      </tr>
      <tr>
        <td>${appointments[2]?.name}</td>
        <td>${capitalizeFirstLetter(appointments[2]?.shift)}</td>
        <td>${appointments[2]?.date}</td>
      </tr>
    </table>
    
      <p>Please ensure you arrive at the test center at least 5 minutes before your scheduled time. Bring all the necessary documents and equipment required for the test.</p>
        <hr/>
          <p>Thank you,</p>
          <p>License Appointment System </p>
          <p>Department of tranport and license</p>
          <p>Government of Nepal</p>
    </div>
    </div>
  </body>
  </html>`;
}

export function newAdministratorTemplate({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
          }
          .container-big{
            width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 2px solid #0388f8;
          }
          .container {
              width: 550px;
              padding:10px;
          }
          .title{
            width: 590px;
            display: flex;
            gap:5px;
            padding-left: 10px;
            background-color: #0388f8;
            color: #ffffff;
          }
          .text-white{
            color: #ffffff;
          }
          .text-lg{
            font-size: 14px;
          }
          .text-xs{
            font-size: 12px;
          }
          .flex-col{
            display: flex;
            flex-direction: column;
            gap: 5px;
            font-weight: 700;
            color: #ffffff;
          }
          h1 {
              text-align: start;
              color: #ffffff;
          }
          p {
              color: #555555;
              font-size: 16px;
              line-height: 1.3;
          }
          .button {
              padding: 10px 20px;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              border: 2px solid #0388f8;
          }
          .button:hover {
              text-color: #ffffff;
              scale: 1.1;
          }
          .logo {
              width: 500px;
              height: 250px;
          }
      </style>
  </head>
  <body>
      <div class="container-big">
      <div class="title">
      <h2>New Administrator Account</h2>
      </div>
      <div class="container">
      <p>Dear ${name},</p>
      <p>We are pleased to inform you that an administrator account has been created for you. Please find your login details below:</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p>For security reasons, we recommend changing your password after logging in for the first time.</p>
          <hr/>
          <p>Thank you for joining our team. We look forward to working with you!</p>
          <p>License Appointment System </p>
          <p>Department of tranport and license</p>
          <p>Government of Nepal</p>
    </div>
      </div>
  </body>
  </html>`;
}

export function passwordChanged({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Password Changed.</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
          }
          .container-big{
            width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 2px solid #0388f8;
          }
          .container {
              width: 550px;
              padding:10px;
          }
          .title{
            width: 590px;
            display: flex;
            gap:5px;
            padding-left: 10px;
            background-color: #0388f8;
            color: #ffffff;
          }
          .text-white{
            color: #ffffff;
          }
          .text-lg{
            font-size: 14px;
          }
          .text-xs{
            font-size: 12px;
          }
          .flex-col{
            display: flex;
            flex-direction: column;
            gap: 5px;
            font-weight: 700;
            color: #ffffff;
          }
          h1 {
              text-align: start;
              color: #ffffff;
          }
          p {
              color: #555555;
              font-size: 16px;
              line-height: 1.3;
          }
          .button {
              padding: 10px 20px;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              border: 2px solid #0388f8;
          }
          .button:hover {
              text-color: #ffffff;
              scale: 1.1;
          }
          .logo {
              width: 500px;
              height: 250px;
          }
      </style>
  </head>
  <body>
      <div class="container-big">
      <div class="title">
          <h1>Account Password Changed.</h1>
      </div>
      <div class="container">
          <p>Dear ${name},</p>
          <p> Your password has been changed successfully.</p>
          <hr/>
          <p>Thank you,</p>
          <p>License Appointment System </p>
          <p>Department of tranport and license</p>
          <p>Government of Nepal</p>
    </div>
      </div>
  </body>
  </html>`;
}
