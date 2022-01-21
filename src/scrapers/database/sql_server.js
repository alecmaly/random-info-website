module.exports = async (axios, cheerio) => {
  const url = 'https://ss64.com/sql/';

  return axios(url)
    .then(response => {
      try {
        const html = response.data;
        const $ = cheerio.load(html)
        const commands = $('pre > a');

        const random_query = commands[Math.floor(Math.random()*commands.length)];



        // command data
        const command_name = random_query.children[0].data.trim()
        const command_url = url + random_query.attribs.href.trim()
        // const command_description = random_query.next.data.trim()


        return `
          <a class='name' href='${url}' target='_blank'>SQL Server</a>:<br>
          <a href='${command_url}' target='_blank'>${command_name}</a><br>
        `
      } catch {
        return "SQL Server: FAILED"
      }

    })
    .catch(console.error);
}
