import { convertDate } from "./convertDate";
import { getOfficeById } from "./officeInfo";

export function informationConfirmationtemplate() {
  return ` <h2>Confirmation receipt of Your Information</h2>
    <p>Dear user,</p>
    <p>We wanted to inform you that we have successfully received the information you recently submitted. Thank you for providing the required details.</p>
    <p>Your submission will now undergo a verification process. Our team will review the information provided and ensure its accuracy. We aim to complete this process promptly and will notify you of the outcome as soon as possible.</p>
    <p>If your submission is verified, you will receive confirmation along with any further instructions, if applicable. In case any discrepancies are found or additional information is required, we will reach out to you promptly to resolve the issue.</p>
    <p>Best regards,<br><h4>License Appointment System</h4><br>Department of tranport and license<br>Government of Nepal</p>`;
}

export function forgetPasswordTemplate({
  token,
  user,
}: {
  token: string;
  user: string;
}) {
  return `<h2>Reset Password</h2>
  <p>Dear ${user},</p>
  <p>We received a request to reset your password. The below give is the reset token.</p>
  <h4>${token}</h4>
  <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
  <p>Best regards,<br>License Appointment System<br>Department of transport and license<br>Government of Nepal</p>`;
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
  return `
    <h2>Document Verification Status</h2>
    <p>Dear ${user},</p>
    <p>We hope this email finds you well. We wanted to inform you about the status of your document verification.</p>
    <p><strong>Status: ${status}</strong></p>
    <p><strong>Message: </strong>${message}</p>
    <p>If your document status is verified, you are all set! If it's pending, please be patient as we review your submission. If any further action is required from your end, we will reach out to you promptly.</p>
    <p>If your document status is rejected, please review the message provided and resubmit your document accordingly.</p>
    <p>Thank you for your cooperation and understanding.</p>
  <p>Best regards,<br><h4>License Appointment System</h4>Department of transport and license<br>Government of Nepal.</p>`;
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
  console.log(appointments, "appointments");
  return `
    <h2>Appointment Confirmation</h2>
    <p>Dear ${user},</p>
    <p>We are pleased to confirm your appointment for a driving license test. Please find the details below:</p>
    <p><strong>Category:</strong> ${category}</p>
    <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
    <p><strong>Date:</strong> ${convertDate(new Date(appointmentDate))}</p>
    <p><strong>Location:</strong> ${location}</p>
    ${appointments.map((ele: any) => (
      <>
        <h3>{ele?.name}</h3>
        <br />
        <p>
          <strong>Date:</strong> {ele?.date}
        </p>
        <br />
        <p>
          <strong>Shift:</strong> ${ele?.shift}
        </p>
        <br />
      </>
    ))}
    <p>Please ensure you arrive at the test center at least 5 minutes before your scheduled time. Bring all the necessary documents and equipment required for the test.</p>
    <p>Thank you for choosing us for your driving license test. We wish you the best of luck!</p>
    <p>Best regards,<br>[Government of Nepal]<br>[Department of transport]<br>[Government of Nepal.]</p>`;
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
  return `
    <h2>Medical Examination Status</h2>
    <p>Dear ${user},</p>
    <p>We are writing to inform you about the status of your recent ${type} examination.</p>
    <p><strong>Status: ${status}</strong></p>
    <p>If your examination status is 'Completed', your results have been reviewed and processed.</p>
    <p>If your status is 'Pending', please note that we are still in the process of reviewing your examination results. This may take some time, and we appreciate your patience.</p>
    <p>If your status is 'failed', please reschedule you appointment.</p>
    <p>Thank you for your cooperation throughout this process.</p>
    <p>Best regards,<br>[Government of Nepal]<br>[Department of transport]<br>[Government of Nepal.]</p>`;
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
  console.log(appointments, "appointments");
  return `
    <h2>Appointment Rescheduled</h2>
    <p>Dear user,</p>
    <p>We are writing to inform you that your appointment has been successfully rescheduled. Please find the updated details below:</p>
    <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
    <p><strong>Date:</strong> ${appointmentDate}</p>
    <p><strong>Location:</strong> ${location}</p>
          <h3>${appointments[0]?.name}</h3>
          <p>
            <strong>Date:</strong> ${appointments[0]?.date}
          </p>
          <p>
            <strong>Shift:</strong> ${appointments[0]?.shift}
          </p>
          <br />
          <h3>${appointments[1]?.name}</h3>
          <p>
            <strong>Date:</strong> ${appointments[1]?.date}
          </p>
          <p>
            <strong>Shift:</strong> ${appointments[1]?.shift}
          </p>
          <br />
          <h3>${appointments[2]?.name}</h3>
          <p>
            <strong>Date:</strong> ${appointments[2]?.date}
          </p>
          <p>
            <strong>Shift:</strong> ${appointments[2]?.shift}
          </p>
          <br />
    <p>If you have any questions or concerns, please don't hesitate to contact us at [contact email or phone number].</p>
    <p>Thank you for your cooperation and understanding.</p>
    <p>Best regards,<br>[Government of Nepal]<br>[Department of transport]<br>[Government of Nepal.]</p>`;
}
