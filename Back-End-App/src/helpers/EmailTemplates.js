const leaveNotification = (leave) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leave Application Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: 20px auto;
            max-width: 600px;
        }
        .header {
            background-color: #007BFF;
            color: #ffffff;
            padding: 10px;
            text-align: center;
        }
        .content {
            padding: 20px;
            font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        }
        .content strong{
            font-family:'Times New Roman', Times, serif;
        }
        tr td:first-child {
            width: 150px;
        }
        tr td:nth-child(2) {
            width: 50px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            background-color: #f4f4f4;
            color: #777777;
            font-size: 12px;
        }
        .button {
            background-color: #4CAF50;
            color: #f3f3f3;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            margin: 10px 0;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #45a049;
            color: #f3f3f3;
        }
        .button:active{
            color: #f3f3f3;
        }
        .signature{
            font-family: 'Times New Roman', Times, serif;
            font-size: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Leave Application Notification</h1>
        </div>
        <div class="content">
            <p>Dear Manager,</p>
            <p>This is to inform you that <strong>${leave.name}</strong> has applied for leave and is awaiting your approval. <hr>Here are the details:</p>
            <table>
                <tr>
                    <td><strong>Employee Name</strong></td>
                    <td><strong>:</strong></td>
                    <td>${leave.name}</td>
                </tr>
                
                <tr>
                    <td><strong>Leave Type</strong></td>
                    <td><strong>:</strong></td>
                    <td>${leave.type}</td>
                </tr>
                <tr>
                    <td><strong>From</strong></td>
                    <td><strong>:</strong></td>
                    <td>${leave.from}</td>
                </tr>
                <tr>
                    <td><strong>From Type</strong></td>
                    <td><strong>:</strong></td>
                    <td>${leave.fromType}</td>
                </tr>
                <tr>
                    <td><strong>To</strong></td>
                    <td><strong>:</strong></td>
                    <td>${leave.to}</td>
                </tr>
                <tr>
                    <td><strong>To Type</strong></td>
                    <td><strong>:</strong></td>
                    <td>${leave.toType}</td>
                </tr>
                <tr>
                    <td><strong>Reason</strong></td>
                    <td><strong>:</strong></td>
                    <td>${leave.reason}</td>
                </tr>
            </table>
            <p>Please log in to the leave management system to review and approve the leave request.</p>
            <p>
                <a href="${process.env.UI_BASE_URL}/admin" class="button">Approve Leave</a>
            </p>
            <p class="signature">Thank you.</p>
            <p class="signature">Best regards,<br>Customer Success Team<br>Uptycs</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Uptycs. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`
}


const leaveProcessed = (approved, leave) => {
    const color = approved ? '#4caf50' : '#e53935';
    const status = approved ? 'Approved' : 'Rejected';
    const title = approved ? 'Approval' : 'Rejection';
    const emotion = approved ? 'are pleased' : 'regret';
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leave ${title} Notification</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: ${color};
            color: #ffffff;
            padding: 10px 0;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            padding: 20px;
            color: #333333;
        }

        .content p, .content div {
            font-size: 16px;
            line-height: 1.5;
        }

        .content .highlight {
            color: ${color};
            font-weight: bold;
        }

        .footer {
            text-align: center;
            padding: 10px 0;
            color: #777777;
            font-size: 12px;
        }

        .footer a {
            color: ${color};
            text-decoration: none;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Leave Request ${status}</h1>
        </div>
        <div class="content">
            <p>Dear <span class="highlight">${leave.name}</span>,</p>
            <p>We ${emotion} to inform you that your leave request has been <span class="highlight">${status}</span> by your manager.</p>
            <p>Here are the details of your ${status} Leave:</p>
            <p><strong>Leave Type:</strong> ${leave.type}</p>
            <p><strong>From:</strong> ${leave.from}</p>
            <p><strong>From Type:</strong> ${leave.fromType}</p>
            <p><strong>To:</strong> ${leave.to}</p>
            <p><strong>To Type:</strong> ${leave.toType}</p>
            <p>If you have any questions or need further assistance, please feel free to reach out to your manager.</p>
            <div style="margin-bottom: 7px;">Best regards,</div>
            <div><span class="highlight">Manager</span></div>
            <div><span class="highlight">Customer Success Team</span></div>
            <div><span class="highlight">Uptycs</span></div>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Uptycs. All rights reserved.</p>
            <p><a href="https://www.uptycs.com">www.yourcompany.com</a></p>
        </div>
    </div>
</body>
</html>`
}


const newUserAdded = (name) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Access Granted Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f6f6f6;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007BFF;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .content h1 {
            font-size: 24px;
            margin-bottom: 10px;
        }
        .content p {
            font-size: 16px;
            line-height: 1.5;
        }
        .button {
            display: inline-block;
            background-color: #007BFF;
            color: #f3f3f3 !important;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #45a049;
            color: #f3f3f3;
        }
        .button:active{
            color: #f3f3f3;
        }
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #f6f6f6;
            color: #999999;
            font-size: 14px;
        }
        @media (max-width: 600px) {
            .content, .header, .footer {
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Leave Management Tool Access</h1>
        </div>
        <div class="content">
            <h1>Welcome to the Leave Management Tool!</h1>
            <p>Dear ${name},</p>
            <p>We are pleased to inform you that you have been granted access to CS Leave Management Tool. You can now log in and start managing your leaves efficiently.</p>
            <p>Click the button below to get started:</p>
            <a href="${process.env.UI_BASE_URL}" class="button">Access Tool</a>
            <p>If you have any questions or need further assistance, feel free to reach out to your Manager.</p>
            <p>Best regards,<br>Customer Success Team<br>Uptycs</p>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Uptycs. All rights reserved.
        </div>
    </div>
</body>
</html>`
}



module.exports = {
    leaveNotification,
    leaveProcessed,
    newUserAdded
}