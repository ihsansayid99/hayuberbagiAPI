const { Relawan } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  const Schema = {
    full_name: 'string|empty:false',
    nickname: 'string|empty:false',
    no_phone: 'string|empty:false|min:12|max:15',
    email: 'string|empty:false',
    j_identity: 'string|empty:false',
    no_identity: 'string|empty:false|min:6|unique',
    address: 'string|empty:false',
    j_sex: 'string|empty:false',
    born_city: 'string|empty:false',
    date_born: 'string|empty:false',
    religion: 'string|empty:false',
    marital_status: 'string|empty:false',
    worked: 'string|empty:false',
    last_study: 'string|empty:false',
    cluster_specialization: 'string|empty:false',
    address_domisil: 'string|empty:false',
  }

  const validate = v.validate(req.body, Schema);
  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate
    })
  }
  const relawan = await Relawan.findOne({
    where: { email: req.body.email }
  })
  const identitas = await Relawan.findOne({
    where: { no_identity: req.body.no_identity }
  })

  if (relawan) {
    return res.status(409).json({
      status: 'error',
      message: 'email already exists'
    })
  }
  if (identitas) {
    return res.status(409).json({
      status: 'error',
      message: 'no identitas already exists'
    })
  }

  const data = {
    full_name: req.body.full_name,
    no_phone: req.body.no_phone,
    nickname: req.body.nickname,
    email: req.body.email,
    j_identity: req.body.j_identity,
    no_identity: req.body.no_identity,
    address: req.body.address,
    j_sex: req.body.j_sex,
    born_city: req.body.born_city,
    date_born: req.body.date_born,
    religion: req.body.religion,
    marital_status: req.body.marital_status,
    worked: req.body.worked,
    last_study: req.body.last_study,
    cluster_specialization: req.body.cluster_specialization,
    address_domisil: req.body.address_domisil
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ihsansayid66@gmail.com',
      pass: 'agdctmdueedxdtcy'
    }
  })


  const createdRelawan = await Relawan.create(data);
  const mailOptions = {
    from: 'ihsansayid66@gmail.com',
    to: `${createdRelawan.email}`,
    subject: 'RELAWAN HAYUBERBAGI 2020',
    text: `Selamat bergabung ${createdRelawan.full_name} di relawan HayuBerbagi!`,
    html: `
        <p>Terimakasih telah bergabung di HayuBerbagi Relawan</p>
        <!doctype html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width">
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>Simple Transactional Email</title>
            <style>
            /* -------------------------------------
                INLINED WITH htmlemail.io/inline
            ------------------------------------- */
            /* -------------------------------------
                RESPONSIVE AND MOBILE FRIENDLY STYLES
            ------------------------------------- */
            @media only screen and (max-width: 620px) {
              table[class=body] h1 {
                font-size: 28px !important;
                margin-bottom: 10px !important;
              }
              table[class=body] p,
                    table[class=body] ul,
                    table[class=body] ol,
                    table[class=body] td,
                    table[class=body] span,
                    table[class=body] a {
                font-size: 16px !important;
              }
              table[class=body] .wrapper,
                    table[class=body] .article {
                padding: 10px !important;
              }
              table[class=body] .content {
                padding: 0 !important;
              }
              table[class=body] .container {
                padding: 0 !important;
                width: 100% !important;
              }
              table[class=body] .main {
                border-left-width: 0 !important;
                border-radius: 0 !important;
                border-right-width: 0 !important;
              }
              table[class=body] .btn table {
                width: 100% !important;
              }
              table[class=body] .btn a {
                width: 100% !important;
              }
              table[class=body] .img-responsive {
                height: auto !important;
                max-width: 100% !important;
                width: auto !important;
              }
            }
        
            /* -------------------------------------
                PRESERVE THESE STYLES IN THE HEAD
            ------------------------------------- */
            @media all {
              .ExternalClass {
                width: 100%;
              }
              .ExternalClass,
                    .ExternalClass p,
                    .ExternalClass span,
                    .ExternalClass font,
                    .ExternalClass td,
                    .ExternalClass div {
                line-height: 100%;
              }
              .apple-link a {
                color: inherit !important;
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                text-decoration: none !important;
              }
              #MessageViewBody a {
                color: inherit;
                text-decoration: none;
                font-size: inherit;
                font-family: inherit;
                font-weight: inherit;
                line-height: inherit;
              }
              .btn-primary table td:hover {
                background-color: #34495e !important;
              }
              .btn-primary a:hover {
                background-color: #34495e !important;
                border-color: #34495e !important;
              }
            }
            </style>
          </head>
          <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
            <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
              <tr>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
                  <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
        
                    <!-- START CENTERED WHITE CONTAINER -->
                    <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This is preheader text. Some clients will show this text as a preview.</span>
                    <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
        
                      <!-- START MAIN CONTENT AREA -->
                      <tr>
                        <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                            <tr>
                              <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                <p style="font-family: sans-serif; font-size: 18px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hi ${createdRelawan.full_name},</p>
                                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Terimakasih Telah submit menjadi Relawan di HayuBerbagi!</p>
                                <p style="font-family: sans-serif; font-size: 20px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Ini link telegram untuk informasi selanjutnya</p>
                                <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                                  <tbody>
                                    <tr>
                                      <td align="center" style="font-family: sans-serif; font-size: 20px; vertical-align: top; padding-bottom: 15px;">
                                        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt;  height: 50px;">
                                          <tbody>
                                            
                                          
                                            <tr>
                                              <td colspan="6" style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> <a href="https://facebook.com" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">Login</a> </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
        
                    <!-- END MAIN CONTENT AREA -->
                    </table>
        
                    <!-- START FOOTER -->
                    <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
                      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                        <tr>
                          <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                            <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Company Inc, 3 Abbey Road, San Francisco CA 94102</span>
                            <br> Don't like these emails? <a href="http://i.imgur.com/CScmqnj.gif" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;">Unsubscribe</a>.
                          </td>
                        </tr>
                        <tr>
                          <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                            Powered by <a href="http://htmlemail.io" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">HTMLemail</a>.
                          </td>
                        </tr>
                      </table>
                    </div>
                    <!-- END FOOTER -->
        
                  <!-- END CENTERED WHITE CONTAINER -->
                  </div>
                </td>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
              </tr>
            </table>
          </body>
        </html>`
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log('Email sent', info.response);
  })
  return res.json({
    status: 'succes',
    data: {
      id: createdRelawan.id
    }
  })
}