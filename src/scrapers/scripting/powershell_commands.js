module.exports  = async (axios, cheerio) => {
  const url_root = 'https://docs.microsoft.com/en-us/powershell/module/'
  const url = url_root + '?view=powershell-6';

  let promise_arr = [];
  const categories = [
    'CimCmdlets',
    'Microsoft.PowerShell.Archive',
    'Microsoft.PowerShell.Core',
    'Microsoft.PowerShell.Host',
    'Microsoft.PowerShell.Management',
    'Microsoft.PowerShell.Security',
    'Microsoft.PowerShell.Utility',
    'Microsoft.PowerShell.Management',
    // 'Microsoft.PowerShell.PackageManagement',
    'PowerShellGet',
    // 'PsDesiredStateConfiguration',
    'PSDiagnostics',
    'PSReadLine'
  ]

  categories.forEach(category => {
    const url = url_root + category + '/'
    promise_arr.push(
      axios(url)
        .then(response => {
          const html = response.data;
          const $ = cheerio.load(html)
          const rows = $('tr');


          // skipping first row
          const random_command = rows[Math.floor(Math.random()*(rows.length))];

          // build command details
          const item_name = random_command.children[1].children[0].children[0].data
          const command_url = url + random_command.children[1].children[0].attribs.href
          const h2_tags =  $('h2')
          const command_category = h2_tags[0].children[0].data
          let command_description = ''
          if (random_command.children[3].children[0] !== undefined)
            command_description = random_command.children[3].children[0].children[0].data

          // console.log()
          // console.log(category)
          // console.log(service_name)
          // console.log(service_url)
          // console.log(command_description)


          return `
            <div class='cell'>
              ${command_category.split('.')[command_category.split('.').length - 1]}<br>
              <a href='${command_url}' target='_blank'>${item_name}</a><br>
              ${command_description}<br>
            </div>
          `
        })
        .catch(console.error)
      )
    })
  return Promise.all(promise_arr)
    .then(value => `
      <div class='name'><a href='${url}' target='_blank'>PowerShell Commands</a>:</div><br>
      <div class='two-columns'>${value.join('')}</div>`
    )
}

