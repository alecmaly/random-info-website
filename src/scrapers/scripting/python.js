module.exports  = async (axios, cheerio) => {
  const url = 'https://www.geeksforgeeks.org/python-programming-language/';

  return axios(url)
    .then(response => {
      try {
        const html = response.data;
        const $ = cheerio.load(html)
        const items = $('.entry-content').find("[href*='geeks']");

        // skipping first row
        const random_command = items[Math.floor(Math.random()*(items.length))];



        const item_name = random_command.children[0].data
        const item_url = random_command.attribs.href
        const item_category = random_command.parent.parent.parent.attribs.class

        // // print to screen
        // console.log('Kali Tool:');
        // console.log(tool_name)
        // console.log(tool_url)
        // console.log(tool_category)
        // console.log(random_command)

        return `
          <a class='name' href='${url}' target='_blank'>Python</a>:<br>
          <a href='${item_url}' target='_blank'>${item_name}</a><br>
          ${item_category}<br>
        `
      } catch {
        return "Python: FAILED"
      }
    })
    .catch(console.error);
}

