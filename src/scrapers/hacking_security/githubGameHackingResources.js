module.exports  = async (axios, cheerio) => {
  const url = 'https://github.com/dsasmblr/game-hacking';

  return axios(url)
    .then(response => {
      try {
        const html = response.data;
        const $ = cheerio.load(html);
        let items = $('table a');
        items = Array.from(items).filter(ele => { return $(ele.children[0]).text() != 'here' })
        
        const random_item = items[Math.floor(Math.random()*(items.length))];

        const item_name = $(random_item.children[0]).text().trim()
        const item_url = random_item.attribs.href
        const item_description = $(random_item.parent.parent.children[5]).text().trim() || $(random_item.parent.parent.children[3]).text().trim()

        return `
          <a class='name' href='${url}' target='_blank'>Game Hacking Resources (github)</a>:<br>
          <a href='${item_url}' target='_blank'>${item_name}</a><br>
          ${item_description}<br>
        `
      } catch {
        return "Game Hacking Resources (github): FAILED"
      }
    })
    .catch(console.error);
}

