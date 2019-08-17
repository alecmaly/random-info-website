module.exports  = async (axios, cheerio) => {
  const url = 'https://en.wikipedia.org/wiki/List_of_fallacies';

  return axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html)
      const items = $('#bodyContent').find("li > a[href*='wiki']");

      // skipping first row
      const random_item = items[Math.floor(Math.random()*(items.length))];


      const item_name = `${random_item.children[0].data} (${random_item.attribs.title})`
      const item_url = 'https://en.wikipedia.org' + random_item.attribs.href


      // // print to screen
      // console.log('Kali Tool:');
      // console.log(tool_name)
      // console.log(tool_url)
      // console.log(tool_category)
      // console.log(random_item.parent.parent.children)

      return `
        <a class='name' href='${url}' target='_blank'>Logical Fallacies</a>:<br>
        <a href='${item_url}' target='_blank'>${item_name}</a><br>
      `
    })
    .catch(console.error);
}

