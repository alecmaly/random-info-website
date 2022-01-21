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
const port = process.env.PORT || 80
app.use(express.json())
app.use(express.static(__dirname + '/public'));



const github_url = 'https://github.com/alecjmaly/random-info-website'

const header = require('./views/header.html')
const footer = require('./views/footer.html')
const table_of_contents = require('./views/tableOfContents.html')



// run syncronously
async function getDataHTML() {
  const cheatsheets = require('./views/cheatsheets')()

  function BuildSection(id, title, datasources, header='', footer='') {
    promiseArr.push(
      Promise.all(
        datasources.map(datasource => require(datasource)(axios, cheerio))
      ).then(values => {
        return (`
            <a id="${id}" name="${id}""></a>
            <h2 class="category">${title}</h2>
          ` + header + values.join('<br>') + footer + '<hr>')
      })
    )
  }


  let html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Random Info Website</title>

      <meta name="viewport" content="user-scalable=yes">
      <meta property="og:title" content="Random Info Website">
      <meta property="og:site_name" content="Random Info Website">
      <meta property="og:url" content="https://random-info-website.azurewebsites.net">
      <meta property="og:description" content="**Give it a minute to load** This site scrapes several websites on demand to serve a single page with random information and links. Hopefully you learn something new!">
      <meta property="og:type" content="website">
      <meta property="og:image" content="https://cheatsheets.blob.core.windows.net/pdfs/table%20of%20contents.PNG">

      <link rel="stylesheet" href="/css/style.css">
    </head>

    <body>
      <div class='main-body'>
      <a id='home' name='home'></a>
      <h1 style='text-align:center'>
        <a href='/'>Random Info Website</a>
        (<a href='${github_url}' target='_blank'>github</a>)
      </h1>


      ${table_of_contents}
      ${header}
      ${cheatsheets}
  `,
    promiseArr = [];



    
  const programming_best_practices = [
    './scrapers/pentesting/OWASPCheatSheet',
    './scrapers/programmingBestPractices/designPatterns',
    './scrapers/programmingBestPractices/dataStructures',
    './scrapers/programmingBestPractices/algorithms'
  ]
  BuildSection('programmingBestPractices', 'Programming Best Practices:', programming_best_practices)

  const other = [
    './scrapers/other/logicalFallacies'
  ]
  BuildSection('other', 'Other:', other)

  const windows_sysinternals = [
    './scrapers/windows_sysinternals/windows_sysinternals'
  ]
  BuildSection('windowsSysinternals', 'Windows Sysinternals:', windows_sysinternals, "<div class='two-columns'>", "</div>")

  const scripting_commands = [
    './scrapers/scripting/bash_command',
    './scrapers/scripting/powershell_commands',
    './scrapers/scripting/cmd_command',
    './scrapers/scripting/javascript',
    './scrapers/scripting/typescript',
    './scrapers/scripting/python'
  ]
  BuildSection('scriptingLanguages', 'Scripting Languages:', scripting_commands)

  const languages = [
    './scrapers/languages/cpp'
  ]
  BuildSection('languages', 'Programming Languages:', languages)

  const data = [
    './scrapers/dataCentricLanguages/dax',
    './scrapers/dataCentricLanguages/m'
  ]
  BuildSection('data', 'Data Centric Languages:', data)


  const database_tools = [
    './scrapers/database/sql_server',
    './scrapers/database/oracle'
  ]
  BuildSection('databases', 'Databases:', database_tools)

  
  const html5 = [
    './scrapers/web/html/html_tags',
    './scrapers/web/html/html_attributes',
    './scrapers/web/html/html_events'
  ]
  BuildSection('html5', 'HTML5:', html5)

  const css = [
    './scrapers/web/css/css_properties',
    './scrapers/web/css/css_selectors'
  ]
  BuildSection('css', 'CSS:', css)

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

  // await all promises to return
  // allows async scrapign across all sites
  console.log('length is: ' + promiseArr.length)
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
app.post('/sendEmail', async (req, res) => {
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
  res.send('pong')
})


app.get('/', async (req, res) => {
  let html = '<h2>Please wait while webpages are scraped for data... this may take a few seconds.</h2><script>window.location.href = "/random"</script>'

  res.send(html);
})

// get random data
app.get('/random', async (req, res) => {
  let html = ''
  try {
    html = await getDataHTML();
  } catch (e) {
    console.trace("Here I am!")
    
    html = `failed to fetch data:<br><br>${e}<br><br>`
  }

  res.send(html);
})


app.listen(port, () => console.log(`App listening on port ${port}!`))



