module.exports  = async (axios, cheerio) => {
  const url = 'https://github.com/vitalysim/Awesome-Hacking-Resources';

  return axios(url)
    .then(response => {
      try {
        const html = response.data;
        const $ = cheerio.load(html);
        const items = $('table a');
        const random_item = items[Math.floor(Math.random()*(items.length))];

        const item_name = random_item.children[0].data.trim()
        const item_url = random_item.attribs.href
        const item_description = random_item.parent.parent.children[3].children[0].data

        return `
          <a class='name' href='${url}' target='_blank'>Awesome Hacking Resources (github)</a>:<br>
          <a href='${item_url}' target='_blank'>${item_name}</a><br>
          ${item_description}<br>
        `
      } catch {
        return "Awesome Hacking Resources (github): FAILED"
      }
    })
    .catch(console.error);
}

