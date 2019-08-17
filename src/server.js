//https://pusher.com/tutorials/web-scraper-node

// pl-scraper.js

const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const express = require('express');


// import config
require('dotenv').config()

// express config
const app = express()
const port = 80
app.use(express.json())



const site_url = 'https://random-info-website.azurewebsites.net/'
const github_url = 'https://github.com/alecjmaly/random-info-website'

// run syncronously
async function getDataHTML() {
  let html = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        #title {
          text-align: center;
          font-size: 110%;
          font-weight: bold;
          padding-bottom: 20px;
        }
        .name {
          color: black;
          font-size: 105%;
          font-weight: 600;
        }
      </style>

      <title>Random Info Website</title>
    </head>

    <body>
      <h1 style='text-align:center'>
        <a href='${site_url}' target='_blank'>
          Random Info Website
        </a>
        (<a href='${github_url}' target='_blank'>github</a>)
      </h1>

  `,
      promiseArr = [];

  // pentesting tools
  promiseArr.push(
    Promise.all([
      // OWASP Cheat Sheet
      require('./scrapers/pentesting/OWASPCheatSheet')(axios, cheerio),

      // Kali tool
      require('./scrapers/pentesting/kali_tool')(axios, cheerio)
    ]).then(values => {
      return ('<h2>Pentesting Tools:</h2>' + values.join('<br>') + '<hr>')
    })
  )

  // scripting
  promiseArr.push(
    Promise.all([
      // bash command
      require('./scrapers/scripting/bash_command')(axios, cheerio),

      // powershell command
      require('./scrapers/scripting/powershell_commands')(axios, cheerio),


      // javascript
      require('./scrapers/scripting/javascript')(axios, cheerio),

      // typescript
      require('./scrapers/scripting/typescript')(axios, cheerio),

      // python
      require('./scrapers/scripting/python')(axios, cheerio)

    ]).then(values => {
      return ('<h2>Scripting Languages:</h2>' + values.join('<br>') + '<hr>')
    })
  )


  // Windows Sysinternals
  promiseArr.push(
    Promise.all([
      // Windows Sysinternals
      require('./scrapers/windows_sysinternals/windows_sysinternals')(axios, cheerio)

    ]).then(values => {
      return ('<h2>Windows Sysinternals:</h2>' + values.join('<br>') + '<hr>')
    })
  )

  // Programming Best Practices
  promiseArr.push(
    Promise.all([
      // design patterns
      require('./scrapers/programmingBestPractices/designPatterns')(axios, cheerio),

      // data structures
      require('./scrapers/programmingBestPractices/dataStructures')(axios, cheerio),

      // algorithms
      require('./scrapers/programmingBestPractices/algorithms')(axios, cheerio)
    ]).then(values => {
      return ('<h2>Programming Best Practices:</h2>' + values.join('<br>') + '<hr>')
    })
  )

  // React
  promiseArr.push(
    Promise.all([
      // React Bits
      require('./scrapers/react/reactBits')(axios, cheerio)


    ]).then(values => {
      return (`
      <h2>React:</h2>
      <p>
        Another resource: <a href="https://github.com/enaqx/awesome-react">Awesome-React</a>
      </p>
      ` + values.join('<br>') + '<hr>')
    })
  )

  // cloud services
  promiseArr.push(
    Promise.all([
      // OWASP Cheat Sheet
      require('./scrapers/cloud/azure')(axios, cheerio)
    ]).then(values => {
      return ('<h2>Cloud Services:</h2>' + values.join('<br>') + '<hr>')
    })
  )


  // Languages
  promiseArr.push(
    Promise.all([
    // c++
    require('./scrapers/languages/cpp')(axios, cheerio)

    ]).then(values => {
      return ('<h2>Programming Languages:</h2>' + values.join('<br>') + '<hr>')
    })
  )

    // Other
    promiseArr.push(
      Promise.all([
      // logical fallacies
      require('./scrapers/other/logicalFallacies')(axios, cheerio)

      ]).then(values => {
        return ('<h2>Other:</h2>' + values.join('<br>') + '<hr>')
      })
    )




  // await all promises to return
  // allows async scrapign across all sites
  html += await Promise.all(promiseArr).then(values => {return values.join('')})


  html += `
        <h2>Useful Links:</h2>
        <ul>
          <li>
            <a href='https://www.exploit-db.com/' target='_blank'>https://www.exploit-db.com/</a><br>
          </li>
          <li>
            <a href='https://www.cvedetails.com' target='_blank'>CVE Details</a><br>
          </li>
          <li>
            <a href='https://www.exploit-db.com/google-hacking-database' target='_blank'>Google Hacking Database</a>
          </li>
          <li>
            <a href='https://www.mxtoolbox.com/NetworkTools.aspx' target='_blank'>MX Toolbox: Network Tools</a>
          </li>
        </ul>

        <br><br><br><br><br>

        <div>
          <a href='https://documentcloud.adobe.com/link/files/'>My Books (Adobe)</a>
        </div>
        <br>
      </body>
    </html>
  `

  return html;
}



function sendEmail(html, emailAddress, emailPassword) {
    // email config
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailAddress, //process.env.EMAIL,
      pass: emailPassword //process.env.EMAIL_PASSWORD
    }
  });


  const mailOptions = {
    from: emailAddress, //process.env.EMAIL, // sender address
    to: emailAddress, //process.env.EMAIL, // list of receivers
    subject: 'Daily Info', // Subject line
    html: html // plain text body
  };

  // send email
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
  });
}



// send email post
app.post('/sendEmail', async (req,res) => {
  // ?emailAddress=alecjmaly@gmail.com&emailPassword=....
  try {
    html = await getDataHTML();
    sendEmail(html, req.body.emailAddress, req.body.emailPassword);
    res.send('success')
  } catch {
    res.send('failed')
  }
})


app.get('/ping', (req, res) => {
  console.log('pinged')
  res.send('pinged')
})

// get random data
app.get('*', async (req, res) => {
  try {
    html = await getDataHTML();
  } catch {
    html = 'failed to fetch data'
  }

  res.send(html);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))



