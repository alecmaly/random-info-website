module.exports = async (axios, cheerio) => {
  const url = 'https://ss64.com/bash/';

  return axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html)
      const commands = $('pre > a');

      const random_command = commands[Math.floor(Math.random()*commands.length)];



      // command data
      const command_name = random_command.children[0].data.trim()
      const command_url = url + random_command.attribs.href.trim()
      const command_description = random_command.next.data.trim()

      // print to screen
      // console.log('Linux command:');
      // console.log(command_name);
      // console.log(command_description);
      // console.log(command_url);
      // console.log()

      return `
        <a class='name' href='${url}' target='_blank'>Bash Command</a>:<br>
        <a href='${command_url}' target='_blank'>${command_name}</a><br>
        ${command_description}<br>
      `

    })
    .catch(console.error);
}
