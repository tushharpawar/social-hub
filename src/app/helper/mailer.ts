import nodemailer, { TransportOptions } from "nodemailer";


export const sendMail = async (
  { email, verificationCode }: any) => {
  try {
    var transport = nodemailer.createTransport({
      host:process.env.SMTP_HOST,
      // secure:true,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },

      // tls: {
      //   rejectUnauthorized: false, // Allow self-signed certificates
      // },
    } as TransportOptions);

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "VERIFY YOUR ACCOUNT",
      label:"inbox",
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href="https://react-email-demo-q2iyfgd67-resend.vercel.app/static/plaid-logo.png"
    />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--$-->
  </head>
  <body
    style="background-color:#ffffff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif"
  >
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:360px;background-color:#ffffff;border:1px solid #eee;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin-top:20px;margin:0 auto;padding:68px 0 130px"
    >
      <tbody>
        <tr style="width:100%">
          <td style="width:100%">
            <h1 style="width:100%; text-align:center">Social-Hub</h1>
            <h3
              style="color:#000;display:inline-block;font-family:HelveticaNeue-Medium,Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;line-height:24px;margin-bottom:0;margin-top:0;text-align:center"
            >
              Enter the following code to finish verification on Social-Hub.
            </h3>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="background:rgba(0,0,0,.05);border-radius:4px;margin:16px auto 14px;vertical-align:middle;width:280px"
            >
              <tbody>
                <tr>
                  <td>
                    <p
                      style="font-size:32px;line-height:40px;margin:0 auto;color:#000;display:inline-block;font-family:HelveticaNeue-Bold;font-weight:700;letter-spacing:6px;padding-bottom:8px;padding-top:8px;width:100%;text-align:center"
                    >
                      ${verificationCode}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html> </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    console.log("email sent succesfully",mailResponse);
    return mailResponse;
  } catch (error) {
    console.log("Failed to send email ", error);
  }
};

