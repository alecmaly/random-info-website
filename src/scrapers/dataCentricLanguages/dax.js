module.exports  = async (axios, cheerio) => {
  const url_root = 'https://docs.microsoft.com/en-us/dax/dax-function-reference/'
  const url = 'https://docs.microsoft.com/en-us/dax/';

  let promise_arr = [];
  const categories = [
    'https://docs.microsoft.com/en-us/dax/date-and-time-functions-dax',
    'https://docs.microsoft.com/en-us/dax/filter-functions-dax',
    'https://docs.microsoft.com/en-us/dax/information-functions-dax',
    'https://docs.microsoft.com/en-us/dax/math-and-trig-functions-dax',
    'https://docs.microsoft.com/en-us/dax/other-functions-dax',
    'https://docs.microsoft.com/en-us/dax/statistical-functions-dax',
    'https://docs.microsoft.com/en-us/dax/text-functions-dax'
  ]

  categories.forEach(category => {
    const url = category
    promise_arr.push(
      axios(url)
        .then(response => {
          const html = response.data;
          const $ = cheerio.load(html)
          const rows = $('tr');


          // skipping first row
          const random_command = rows[Math.floor(Math.random()*(rows.length))];

          // build command details
          const command_name = random_command.children[1].children[0].children[0].data
          const command_url = 'https://docs.microsoft.com/en-us/dax/' + random_command.children[1].children[0].attribs.href
          let command_category = ''
          const h2_tags =  $('main > h1')
          if (h2_tags[0].children !== undefined)
            command_category = h2_tags[0].children[0].data
          let command_description = ''
          if (random_command.children[3].children[0] !== undefined)
            command_description = random_command.children[3].children[0].data

          // console.log()
          // console.log(category)
          // console.log(service_name)
          // console.log(service_url)
          // console.log(command_description)


          return `
            <div class='cell'>
              ${command_category}<br>
              <a href='${command_url}' target='_blank'>${command_name}</a><br>
              ${command_description}<br><br>
            </div>
          `
        })
        .catch(console.error)
      )
    })
  return Promise.all(promise_arr).then(value => `
    <div class='name'><a href='${url}' target='_blank'>DAX Commands</a>:</div><br>
    <div class='two-columns'>${value.join('')}</div>`)
}

