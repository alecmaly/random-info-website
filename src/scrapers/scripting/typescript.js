module.exports  = async (axios, cheerio) => {
  const url = 'https://www.typescriptlang.org/docs/';
  const u = new URL(url)

  return axios(url)
    .then(response => {
      try {
        const html = response.data;
        const $ = cheerio.load(html)
        const items = $('[href*="docs/handbook"]');

        // skipping first row
        const random_command = items[Math.floor(Math.random()*(items.length))];


        const item_name = random_command.children[0].data
        const item_url = u.origin + random_command.attribs.href


        // // print to screen
        // console.log('Kali Tool:');
        // console.log(tool_name)
        // console.log(tool_url)
        // console.log(tool_category)
        // console.log(random_item)

        return `
          <a class='name' href='${url}' target='_blank'>TypeScript</a>:<br>
          <a href='${item_url}' target='_blank'>${item_name}</a><br>
        `
      } catch {
        return "TypeScript: FAILED"
      }
    })
    .catch(console.error);
}

