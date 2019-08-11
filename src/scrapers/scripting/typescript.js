module.exports  = async (axios, cheerio) => {
  const url = 'https://www.typescriptlang.org/docs/handbook/basic-types.html';

  return axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html)
      const items = $('#toc-handbook').find('[href*="/docs/handbook"]');

      // skipping first row
      const random_item = items[Math.floor(Math.random()*(items.length))];


      const item_name = random_item.children[0].data
      const item_url = 'https://www.typescriptlang.org' + random_item.attribs.href


      // // print to screen
      // console.log('Kali Tool:');
      // console.log(tool_name)
      // console.log(tool_url)
      // console.log(tool_category)
      // console.log(random_item)

      return `
        <a class='name' href='${url}' target='_blank'>TypeScript</a>:<br>
        ${item_name}<br>
        <a href='${item_url}' target='_blank'>${item_url}</a><br>
      `
    })
    .catch(console.error);
}

