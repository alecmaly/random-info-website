module.exports  = async (axios, cheerio) => {
  const url = 'https://www.geeksforgeeks.org/fundamentals-of-algorithms/';

  return axios(url)
    .then(response => {
      try {
        const html = response.data;
        const $ = cheerio.load(html)
        const items = $('.entry-content').find("[href*='geeks']");

        // skipping first row
        const random_item = items[Math.floor(Math.random()*(items.length))];



        const item_name = random_item.children[0].data
        const item_url = random_item.attribs.href
        const item_category = random_item.parent.parent.parent.children[0].children[0].children[0].data


        // // print to screen
        // console.log('Kali Tool:');
        // console.log(tool_name)
        // console.log(tool_url)
        // console.log(tool_category)
        // console.log(random_item)

        return `
          <a class='name' href='${url}' target='_blank'>Algorithms</a>:<br>
          <a href='${item_url}' target='_blank'>${item_name}</a><br>
          ${item_category}<br>
        `
      } catch {
        return "Algorithms: FAILED"
      }
    })
    .catch(console.error);
}

