//https://pusher.com/tutorials/web-scraper-node

// pl-scraper.js

const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const express = require('express');
const fs = require('fs');

require.extensions['.html'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

// import config
require('dotenv').config()

// express config
const app = express()
const port = 80
app.use(express.json())
app.use(express.static(__dirname + '/public'));


const site_url = 'https://random-info-website.azurewebsites.net/'
const github_url = 'https://github.com/alecjmaly/random-info-website'


const footer = require('./views/footer.html')
const table_of_contents = require('./views/tableOfContents.html')

// run syncronously
async function getDataHTML() {
  let html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Random Info Website</title>
      <link rel="stylesheet" href="/css/style.css">
    </head>

    <body>
      <div class='content'>
      <a id='home' name='home'></a>
      <h1 style='text-align:center'>
        <a href='${site_url}}' target='_blank'>
          Random Info Website
        </a>
        (<a href='${github_url}' target='_blank'>github</a>)
      </h1>


      ${table_of_contents}
  `,
    promiseArr = [];



  function BuildSection(id, title, datasources, header='') {
    promiseArr.push(
      Promise.all(
        datasources.map(datasource => require(datasource)(axios, cheerio))
      ).then(values => {
        return (`
            <a id="${id}" name="${id}""></a>
            <h2 class="category">${title}</h2>
          ` + header + values.join('<br>') + '<hr>')
      })
    )
  }



  const pentesting_tools = [
    './scrapers/pentesting/OWASPCheatSheet',
    './scrapers/pentesting/kali_tool'
  ]
  BuildSection('pentestingTools', 'Security and Pentesting:', pentesting_tools)

  const scripting_commands = [
    './scrapers/scripting/bash_command',
    './scrapers/scripting/powershell_commands',
    './scrapers/scripting/cmd_command',
    './scrapers/scripting/javascript',
    './scrapers/scripting/typescript',
    './scrapers/scripting/python'
  ]
  BuildSection('scriptingLanguages', 'Scripting Languages:', scripting_commands)


  const windows_sysinternals = [
      './scrapers/windows_sysinternals/windows_sysinternals'
  ]
  BuildSection('windowsSysinternals', 'Windows Sysinternals:', windows_sysinternals)


  const programming_best_practices = [
    './scrapers/programmingBestPractices/designPatterns',
    './scrapers/programmingBestPractices/dataStructures',
    './scrapers/programmingBestPractices/algorithms'
  ]
  BuildSection('programmingBestPractices', 'Programming Best Practices:', programming_best_practices)


  const react_js = [
    './scrapers/react/reactBits'
  ]
  BuildSection('reactjs', 'React:', react_js, `
    <p>
      Another resource: <a href="https://github.com/enaqx/awesome-react">Awesome-React</a>
    </p>`)


  const cloud_services = [
    './scrapers/cloud/azure'
  ]
  BuildSection('cloudServices', 'Cloud Services:', cloud_services)

  const languages = [
    './scrapers/languages/cpp'
  ]
  BuildSection('languages', 'Programming Languages:', languages)

  const data = [
    './scrapers/dataCentricLanguages/dax',
    // './scrapers/dataCentricLanguages/m'
  ]
  BuildSection('data', 'Data Centric Languages:', data)


  const database_tools = [
    './scrapers/database/sql_server',
    './scrapers/database/oracle'
  ]
  BuildSection('databases', 'Databases:', database_tools)

  const other = [
    './scrapers/other/logicalFallacies'
  ]
  BuildSection('other', 'Other:', other)


  // await all promises to return
  // allows async scrapign across all sites
  html += await Promise.all(promiseArr).then(values => {return values.join('')})


  html += `
      ${footer}
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



