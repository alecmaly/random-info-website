module.exports  = async (axios, cheerio) => {
  const url = 'https://www.pdq.com/powershell';

  return axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html)
      const rows = $('tr');

      // skipping first row
      const random_row = rows[Math.floor(Math.random()*(rows.length - 1)) + 1];

      // random_row.children.forEach((ele, i) => {
      //   console.log(i)
      //   console.log(ele.children)

      // })

      const command_name = random_row.children[1].children[0].attribs.href.split('/')[2].trim()
      const command_url = 'https://www.pdq.com' + random_row.children[1].children[0].attribs.href.trim()
      // const command_alias = random_row.children[3].children[0]
      const command_description = random_row.children[5].children[0].data.trim()
      const command_type = random_row.children[7].children[0].data.trim()

      // // print to screen
      // console.log('PowerShell command:');
      // console.log(command_name);
      // console.log(command_description);
      // console.log(command_url);
      // console.log(command_type)
      // console.log()

      return `
      PowerShell Command:<br>
      ${command_name}<br>
      ${command_description}<br>
      <a href='${command_url}' target='_blank'>${command_url}</a><br>
      ${command_type}<br>
    `
    })
    .catch(console.error);
}
