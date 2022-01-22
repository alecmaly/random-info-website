module.exports  = async (axios, cheerio) => {
  const url = 'https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Methodology%20and%20Resources';
  const u = new URL(url)
  return axios(url)
    .then(response => {
      try {
        const html = response.data;
        const $ = cheerio.load(html);
        let items = $('[aria-label="File"]');
                const random_item = items[Math.floor(Math.random()*(items.length))];
        
        const item_name = $(random_item.parent.parent.children[3].children[1]).text().trim()
        const item_url = u.origin + random_item.parent.parent.children[3].children[1].children[0].attribs.href
        const item_description = random_item.parent.parent.children[3].children[0].data

        return `
          <a class='name' href='${url}' target='_blank'>PayloadsAllTheThings - Methodology and Resources (github)</a>:<br>
          <a href='${item_url}' target='_blank'>${item_name.replace('.md', '')}</a><br>
        `
      } catch {
        return "PayloadsAllTheThings - Methodology and Resources (github): FAILED"
      }
    })
    .catch(console.error);
}

