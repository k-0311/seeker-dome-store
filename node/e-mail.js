const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const axios = require('axios');

function holyshit () {
  return axios.get('https://chp.shadiao.app/api.php')
}

async function sendMail (text) {
  const user = 'fuck@xx.com'
  const authCode = 'xxx'
  const shoujianren = 'fuckyou@xx.com'
  const transporter = nodemailer.transporter({
    host: '',
    port: 666,
    secure: false,
    auth: {
      user,
      pass: authCode
    }
  })
  let info = await transporter.sendMail({
    form: `your father<${user}>`,
    to: `dear son<${shoujianren}>`,
    subject: 'fq',
    text
  })
  console.log("sendMail -> info", info)
}

// schedule.scheduleJob({ hour: 17, minute: 21 }, function () {
//   console.log(`${new Date().toLocaleString()} 启动任务`)
//   holyshit().then(({ data }) => {
//     sendMail(data)
//   })
// })