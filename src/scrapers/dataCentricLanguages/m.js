module.exports  = async (axios, cheerio) => {
  const url_root = 'https://docs.microsoft.com/en-us/powerquery-m/power-query-m-function-reference'
  const url = url_root;

  let promise_arr = [];
  const categories = [
    'https://docs.microsoft.com/en-us/powerquery-m/accessing-data-functions'
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
          const command_url = url + random_command.children[1].children[0].attribs.href
          const h2_tags =  $('main > h1')
          const command_category = h2_tags[0].children[0].data
          let command_description = ''
          if (random_command.children[3].children[0] !== undefined)
            command_description = random_command.children[3].children[0].data

          // console.log()
          // console.log(category)
          // console.log(service_name)
          // console.log(service_url)
          // console.log(command_description)


          return `
            ${command_category}<br>
            <a href='${command_url}' target='_blank'>${command_name}</a><br>
            ${command_description}<br><br>
          `
        })
        .catch(console.error)
      )
    })
  return Promise.all(promise_arr).then(value => `<a class='name' href='${url}' target='_blank'>M Query Commands</a>:<br>` + value.join(''))
}

