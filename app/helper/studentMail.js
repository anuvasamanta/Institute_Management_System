
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendStudentReport = async (studentData) => {
  try {
    const emailOptions = {
      from: `"Institute Management System" <${process.env.EMAIL_USER}>`,
      to: studentData.email,
      subject: `Student Performance Report - ${studentData.name}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student Performance Report</title>
  <style>
    /* Add your styles here */
  </style>
</head>
<body>
  <h1>Student Performance Report</h1>
  <h2>Student Details</h2>
  <table border="1">
    <tr>
      <th>Name</th>
      <td>${studentData.name}</td>
    </tr>
    <tr>
      <th>Email</th>
      <td>${studentData.email}</td>
    </tr>
  </table>

  <h2>Attendance</h2>
  <table border="1">
    <tr>
      <th>Date</th>
      <th>Status</th>
    </tr>
    ${studentData.attendance.map((record) => `
      <tr>
        <td>${record.date}</td>
        <td>${record.status}</td>
      </tr>
    `).join('')}
  </table>

  <h2>Exam Results</h2>
  <table border="1">
    <tr>
      <th>Exam Name</th>
      <th>Marks Obtained</th>
      <th>Total Marks</th>
    </tr>
    ${studentData.exams.map((exam) => `
      <tr>
        <td>${exam.name}</td>
        <td>${exam.marks.obtainedMarks}</td>
        <td>${exam.totalMarks}</td>
      </tr>
    `).join('')}
  </table>
</body>
</html>`
    };

    await transporter.sendMail(emailOptions);
    console.log(`Student report sent successfully to ${studentData.email}`);
    return true;
  } catch (error) {
    console.error('Error sending student report:', error);
    return false;
  }
};

module.exports = { sendStudentReport };