module.exports  = async (axios, cheerio) => {
  const url = 'https://sourcemaking.com/design_patterns';

  return axios(url)
    .then(response => {
      try {
        const html = response.data;
        const $ = cheerio.load(html)
        const items = $('.main-content-container').find("li > a");

        // skipping first row
        const random_item = items[Math.floor(Math.random()*(items.length))];



        const item_name = random_item.children[0].data
        const item_url = 'https://sourcemaking.com' + random_item.attribs.href
        const item_description = `
          &ensp;&ensp;- ${random_item.attribs.title}<br>
          &ensp;&ensp;- ${random_item.next.next.data.trim()}
        `


        // // print to screen
        // console.log('Kali Tool:');
        // console.log(tool_name)
        // console.log(tool_url)
        // console.log(tool_category)
        // console.log(random_item.next.next.data)

        return `
          <a class='name' href='${url}' target='_blank'>Design Patterns</a>:<br>
          <a href='${item_url}' target='_blank'>${item_name}</a><br>
          ${item_description}<br>
        `
      } catch {
        return "Design Patterns: FAILED"
      }
    })
    .catch(console.error);
}

