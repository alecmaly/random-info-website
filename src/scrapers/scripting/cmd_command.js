module.exports = async (axios, cheerio) => {
  const url = 'https://ss64.com/nt/';

  return axios(url)
    .then(response => {
      try {
      const html = response.data;
      const $ = cheerio.load(html)
      const commands = $('tbody').find('a');

      const random_command = commands[Math.floor(Math.random()*commands.length)];



      // command data
      const command_name = random_command.children[0].data.trim()
      const command_url = url + random_command.attribs.href.trim()
      const command_description = random_command.parent.parent.children[5].children[0].data.trim()


      return `
        <a class='name' href='${url}' target='_blank'>CMD</a>:<br>
        <a href='${command_url}' target='_blank'>${command_name}</a><br>
        ${command_description}<br>
      `
      } catch {
        return "CMD: FAILED"
      }

    })
    .catch(console.error);
}
